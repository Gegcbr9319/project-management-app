import React from 'react';
import { Token, UserAuthDto } from 'models';
import { setToken, useSignInMutation } from 'store';
import { UserForm } from 'components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export function SignInPage() {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

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
          const signInResult = await signIn(userAuthData as UserAuthDto).unwrap();

          if (signInResult) {
            const token = new Token(signInResult.token);
            dispatch(setToken(token));
            navigate('/boards');
          }
        },
      }}
      auxLink={{
        text: "Don't have an account? Sign up",
        redirectTo: '/signup',
      }}
    />
  );
}
