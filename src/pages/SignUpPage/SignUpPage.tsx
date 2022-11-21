import React from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from 'store/auth/authThunks';
import { NewUserDto } from 'model/user';
import { AppDispatch } from 'store';
import { UserForm } from 'components/UserForm';

export function SignUpPage() {
  const dispatch: AppDispatch = useDispatch();

  return (
    <UserForm
      title="Sign up"
      initialValues={{
        name: '',
        login: '',
        password: '',
      }}
      submit={{
        text: 'Sign Up',
        callback: (newUserData) => dispatch(signUp(newUserData as NewUserDto)),
        redirectTo: '/main',
      }}
      auxLink={{
        text: 'Already have an account? Sign in',
        redirectTo: '/signin',
      }}
    />
  );
}
