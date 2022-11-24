import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewUserDto, UserAuthDto, UserDto, Token, TokenDto } from 'models';
import { updateUserData, userSignedIn } from './authSlice';
import { appApi } from 'store/appApi';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ name, login, password }: NewUserDto, { dispatch }): Promise<void> => {
    try {
      const signUpResult = await dispatch(
        appApi.endpoints.signUp.initiate({ name, login, password })
      );

      if (!Object.prototype.hasOwnProperty.call(signUpResult, 'data')) {
        return;
      }

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

      const signInResult = await dispatch(appApi.endpoints.signIn.initiate(userAuthData));

      if (!Object.prototype.hasOwnProperty.call(signInResult, 'data')) {
        return;
      }

      const token = new Token((signInResult as { data: TokenDto }).data.token);
      const userId = token.decoded?.id;

      if (!userId) {
        return;
      }

      // update token and available user data
      dispatch(
        userSignedIn({
          isAuthenticated: true,
          user: {
            _id: userId,
            login,
            password,
          },
          token,
        })
      );

      // fetch and update remaining user data (name)
      await dispatch(loadUser(userId));
    } catch (error) {
      console.log(error);
      // dispatch error action?
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (userId: string, { dispatch }): Promise<void> => {
    try {
      const getUserResult = await dispatch(appApi.endpoints.getUser.initiate(userId));

      if (!Object.prototype.hasOwnProperty.call(getUserResult, 'data')) {
        return;
      }

      dispatch(updateUserData(getUserResult.data as UserDto));
    } catch (error) {
      console.log(error);
      // dispatch error action?
    }
  }
);
