import React from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from 'store/auth/authThunks';
import { UserAuthDto } from 'models';
import { AppDispatch } from 'store';
import { UserForm } from 'components';
import { useNavigate } from 'react-router-dom';

export function SignInPage() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <UserForm
      title="Sign in"
      initialValues={{
        login: '',
        password: '',
      }}
      submit={{
        text: 'Sign In',
        callback: async (userAuthData) => {
          await dispatch(signIn(userAuthData as UserAuthDto));
          navigate('/boards');
        },
      }}
      auxLink={{
        text: "Don't have an account? Sign up",
        redirectTo: '/signup',
      }}
    />
  );
}
