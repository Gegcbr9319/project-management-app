import React from 'react';
import { ApiError, ErrorResponse, Token, UserAuthDto } from 'models';
import { setError, setToken, useSignInMutation } from 'store';
import { Loader, UserForm } from 'components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export function SignInPage() {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();

  return (
    <>
      {isLoading && <Loader />}
      <UserForm
        title="Sign in"
        initialValues={{
          login: '',
          password: '',
        }}
        submit={{
          text: 'Sign In',
          callback: async (userAuthData) => {
            try {
              const signInResult = await signIn(userAuthData as UserAuthDto).unwrap();

              if (signInResult) {
                const token = new Token(signInResult.token);
                dispatch(setToken(token));
                navigate('/boards');
              }
            } catch (error) {
              if (Object.prototype.hasOwnProperty.call(error, 'data')) {
                dispatch(setError((error as ApiError).data as ErrorResponse));
              }
            }
          },
        }}
        auxLink={{
          text: "Don't have an account? Sign up",
          redirectTo: '/signup',
        }}
      />
    </>
  );
}
