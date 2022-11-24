import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, signUp } from 'store';
import { NewUserDto } from 'models';
import { UserForm } from 'components';
import { useNavigate } from 'react-router-dom';

export function SignUpPage() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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
        callback: async (newUserData) => {
          await dispatch(signUp(newUserData as NewUserDto));
          navigate('/boards');
        },
      }}
      auxLink={{
        text: 'Already have an account? Sign in',
        redirectTo: '/signin',
      }}
    />
  );
}
