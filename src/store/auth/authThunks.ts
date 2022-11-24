import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewUserDto, UserAuthDto } from 'model/user';
import { userSignedIn } from './authSlice';
import { Token } from 'model/auth';
import { useGetUserQuery, useSignInMutation, useSignUpMutation } from 'api';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ name, login, password }: NewUserDto, { dispatch }): Promise<void> => {
    try {
      const [triggerSignUp] = useSignUpMutation();
      await triggerSignUp({ name, login, password });

      // Sign in the newly created user
      dispatch(
        signIn({
          login,
          password,
        })
      );
    } catch (error) {
      console.log(error);
      // dispatch error action?
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (userAuthData: UserAuthDto, { dispatch }): Promise<void> => {
    try {
      const { login, password } = userAuthData;
      const [triggerSignIn, { data: signInResult }] = useSignInMutation();
      await triggerSignIn(userAuthData);

      if (!signInResult) {
        return;
      }

      const token = new Token(signInResult.token);
      const userId = token.decoded?.id;

      if (!userId) {
        return;
      }

      const { data: getUserResult } = useGetUserQuery(userId);

      if (!getUserResult) {
        return;
      }

      const { name } = getUserResult;

      dispatch(
        userSignedIn({
          isAuthenticated: true,
          user: {
            _id: userId,
            name,
            login,
            password,
          },
          token,
        })
      );
    } catch (error) {
      console.log(error);
      // dispatch error action?
    }
  }
);
