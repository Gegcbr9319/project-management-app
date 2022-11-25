import React from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { Link as RouterLink } from 'react-router-dom';
import { PasswordField } from 'components';

const nameValidation = { name: yup.string().required('Name is required') };
const loginValidation = { login: yup.string().required('Login is required') };
const passwordValidation = { password: yup.string().required('Password is required') };

type FormData = Partial<{
  name: string;
  login: string;
  password: string;
}>;

interface UserFormProps {
  avatar?: JSX.Element;
  title: string;
  initialValues: FormData;
  submit: {
    text: string;
    callback: (data: FormData) => Promise<void>;
  };
  auxLink?: {
    text: string;
    redirectTo: string;
  };
}

export function UserForm({
  avatar = <LockOutlinedIcon />,
  title,
  initialValues,
  submit,
  auxLink,
}: UserFormProps) {
  const { name, login, password } = initialValues;
  const validationSchema = yup.object(
    Object.assign(
      {},
      name !== undefined ? nameValidation : {},
      login !== undefined ? loginValidation : {},
      password !== undefined ? passwordValidation : {}
    )
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (data: FormData, { setSubmitting }) => {
        await submit.callback(data);
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting, errors, dirty }) => (
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>{avatar}</Avatar>
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Form>
                <Grid container spacing={2}>
                  {initialValues.name !== undefined ? (
                    <Grid item xs={12}>
                      <Field component={TextField} name="name" label="Name" fullWidth />
                    </Grid>
                  ) : null}
                  {initialValues.login !== undefined ? (
                    <Grid item xs={12}>
                      <Field component={TextField} name="login" label="Login" fullWidth />
                    </Grid>
                  ) : null}
                  {initialValues.password !== undefined ? (
                    <Grid item xs={12}>
                      <Field component={PasswordField} name="password" label="Password" fullWidth />
                    </Grid>
                  ) : null}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={Object.keys(errors).length > 0 || !dirty || isSubmitting}
                  onClick={submitForm}
                >
                  {submit.text}
                </Button>
                {auxLink ? (
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link component={RouterLink} to={auxLink.redirectTo} variant="body2">
                        {auxLink.text}
                      </Link>
                    </Grid>
                  </Grid>
                ) : null}
              </Form>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
}
