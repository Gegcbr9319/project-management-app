import React, { useCallback, useMemo, useRef } from 'react';
import {
  AppState,
  removeToken,
  setDeleteCallback,
  setToken,
  setTokenTimeout,
  useDeleteUserMutation,
  useGetUserQuery,
  useSignInMutation,
  useUpdateUserMutation,
} from 'store';
import { AuthState, ErrorState, Token } from 'models';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Button, Grid, Box, Typography, Container, Alert } from '@mui/material';
import * as yup from 'yup';
import { Formik, Form, Field, FormikProps } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import { Loader, PasswordField } from 'components';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
  setNewPassword: yup.boolean(),
  newPassword: yup.string().when('setNewPassword', {
    is: true,
    then: yup.string().required('New password is required'),
  }),
  confirmNewPassword: yup.string().when('setNewPassword', {
    is: true,
    then: yup
      .string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  }),
});

interface EditProfileFormData {
  name: string;
  login: string;
  password: string;
  setNewPassword: boolean;
  newPassword: string;
  confirmNewPassword: string;
}

export function EditProfilePage(): JSX.Element {
  const { token } = useSelector(({ auth }: AppState): AuthState => auth);
  const { error } = useSelector(({ error }: AppState): ErrorState => error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useMemo(() => {
    return token?.decoded?.id || '';
  }, [token]);

  const { data: user, isLoading } = useGetUserQuery(userId);
  const [signIn] = useSignInMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const initialValues = useMemo((): EditProfileFormData => {
    return {
      name: user?.name || '',
      login: user?.login || '',
      password: '',
      setNewPassword: false,
      newPassword: '',
      confirmNewPassword: '',
    };
  }, [user]);

  const formRef = useRef<FormikProps<EditProfileFormData> | null>(null);

  const deleteProfileCallback = useCallback(async (): Promise<void> => {
    // sign in to verify that the old password is correct
    const signInResult = await signIn({
      login: user?.login || '',
      password: formRef.current?.values.password || '',
    }).unwrap();

    if (signInResult) {
      // since we've gotten a new token, save it to store
      // we're still saving it just in case delete fails
      const newToken = new Token(signInResult.token);
      const tokenTimeout = setTimeout(() => dispatch(removeToken()), newToken.timeLeft);
      dispatch(setTokenTimeout(tokenTimeout));
      dispatch(setToken(newToken));

      // delete user from server
      await deleteUser(userId).unwrap();

      navigate('/signout');
    }
  }, [deleteUser, dispatch, navigate, signIn, user?.login, userId]);

  const handleDeleteProfile = (): void => {
    dispatch(setDeleteCallback(deleteProfileCallback));
  };

  return (
    <>
      {isLoading && <Loader />}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        innerRef={formRef}
        onSubmit={async (data: EditProfileFormData, { setSubmitting }) => {
          const { name, login, password, setNewPassword, newPassword } = data;

          // sign in to verify that the old password is correct
          const signInResult = await signIn({
            login: user?.login || '',
            password,
          }).unwrap();

          if (signInResult) {
            // since we've gotten a new token, save it to store
            const newToken = new Token(signInResult.token);
            const tokenTimeout = setTimeout(() => dispatch(removeToken()), newToken.timeLeft);
            dispatch(setTokenTimeout(tokenTimeout));
            dispatch(setToken(newToken));

            // post updated user data to server
            await updateUser({
              _id: userId,
              name,
              login: login,
              password: setNewPassword ? newPassword! : password,
            }).unwrap();

            navigate('/boards');
          }

          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting, values, errors, dirty }) => (
          <Container maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AccountCircleOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit Profile
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Form>
                  <Grid container spacing={2}>
                    {error && error.statusCode === 401 ? (
                      <Grid item xs={12}>
                        <Alert severity="error">
                          Password or login are incorrect.
                          {<br />}
                          Check the credentials and try again.
                        </Alert>
                      </Grid>
                    ) : null}
                    <Grid item xs={12}>
                      <Field component={TextField} name="name" label="Name" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <Field component={TextField} name="login" label="Login" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <Field component={PasswordField} name="password" label="Password" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="setNewPassword"
                        Label={{ label: 'Set new password' }}
                      />
                    </Grid>
                    {values.setNewPassword ? (
                      <>
                        <Grid item xs={12}>
                          <Field
                            component={PasswordField}
                            name="newPassword"
                            label="New password"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            component={PasswordField}
                            name="confirmNewPassword"
                            label="Confirm new password"
                            fullWidth
                          />
                        </Grid>
                      </>
                    ) : null}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}
                    disabled={Object.keys(errors).length > 0 || !dirty || isSubmitting}
                    onClick={submitForm}
                  >
                    Update Profile
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 1, mb: 2 }}
                    disabled={
                      !userId || values.password === '' || !!errors.password || isSubmitting
                    }
                    onClick={handleDeleteProfile}
                  >
                    Delete Profile
                  </Button>
                </Form>
              </Box>
            </Box>
          </Container>
        )}
      </Formik>
    </>
  );
}
