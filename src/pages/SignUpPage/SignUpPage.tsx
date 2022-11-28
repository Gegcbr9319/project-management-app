import React from 'react';
import { setToken, useSignInMutation, useSignUpMutation } from 'store';
import { NewUserDto, Token, UserAuthDto } from 'models';
import { Loader, UserForm } from 'components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export function SignUpPage() {
  const navigate = useNavigate();
  const [signUp, signInResult] = useSignUpMutation();
  const [signIn, signUpResult] = useSignInMutation();
  const dispatch = useDispatch();

  return (
    <>
      {(signInResult.isLoading || signUpResult.isLoading) && <Loader />}
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
            await signUp(newUserData as NewUserDto);
            const { login, password } = newUserData as UserAuthDto;

            const signInResult = await signIn({ login, password }).unwrap();

            if (signInResult) {
              const token = new Token(signInResult.token);
              dispatch(setToken(token));
              navigate('/boards');
            }
          },
        }}
        auxLink={{
          text: 'Already have an account? Sign in',
          redirectTo: '/signin',
        }}
      />
    </>
  );
}
