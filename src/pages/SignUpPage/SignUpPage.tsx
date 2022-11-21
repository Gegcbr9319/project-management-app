import React from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from 'store/auth/authThunks';
import { NewUserDto } from 'model/user';
import { AppDispatch } from 'store';
import { UserForm } from 'components/UserForm';
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
