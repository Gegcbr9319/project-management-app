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
import { signUp } from 'store/auth/authThunks';
import { NewUserDto } from 'model/user';
import { AppDispatch } from 'store';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
});

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        name: '',
        login: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(newUserData: NewUserDto, { setSubmitting }) => {
        dispatch(signUp(newUserData));
        setSubmitting(false);
        navigate('/main');
      }}
    >
      {({ submitForm, isSubmitting }) => (
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
              Sign up
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field component={TextField} name="name" label="Name" fullWidth />
                  </Grid>
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
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link component={RouterLink} to="/signin" variant="body2">
                      Already have an account? Sign in
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
