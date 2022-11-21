import React from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from 'store/auth/authThunks';
import { UserAuthDto } from 'model/user';
import { AppDispatch } from 'store';
import { UserForm } from 'components/UserForm';

export function SignInPage() {
  const dispatch: AppDispatch = useDispatch();

  return (
    <UserForm
      title="Sign in"
      initialValues={{
        login: '',
        password: '',
      }}
      submit={{
        text: 'Sign In',
        callback: (userAuthData) => dispatch(signIn(userAuthData as UserAuthDto)),
        redirectTo: '/boards',
      }}
      auxLink={{
        text: "Don't have an account? Sign up",
        redirectTo: '/signup',
      }}
    />
  );
}
