import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewUserDto, UserAuthDto } from 'model/user';
import * as API from 'api';
import { userSignedIn } from './authSlice';
import { TokenContent } from 'model/auth';
import jwtDecode from 'jwt-decode';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ name, login, password }: NewUserDto, { dispatch }): Promise<void> => {
    try {
      await API.signUp({ name, login, password });

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
      const { token } = await API.signIn({ login, password });
      const { id } = jwtDecode<TokenContent>(token);
      const { name } = await API.getUser(id, token);

      dispatch(
        userSignedIn({
          isAuthenticated: true,
          user: {
            _id: id,
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
