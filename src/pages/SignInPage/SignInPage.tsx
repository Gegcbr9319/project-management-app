import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { signIn } from 'store/auth/authThunks';
import { UserAuthDto } from 'model/user';
import { AppDispatch } from 'store';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
});

export function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(userAuthData: UserAuthDto, { setSubmitting }) => {
        dispatch(signIn(userAuthData));
        setSubmitting(false);
        navigate('/main');
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field component={TextField} name="login" label="Login" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      label="Password"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={toggleShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={Object.keys(errors).length > 0 || !dirty || isSubmitting}
                  onClick={submitForm}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link component={RouterLink} to="/signup" variant="body2">
                      Don&apos;t have an account? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
}
