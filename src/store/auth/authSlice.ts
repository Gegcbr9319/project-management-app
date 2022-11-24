import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticatedState, AuthState, UnauthenticatedState } from 'model/auth';
import { User } from 'model/user';
import { authDefaults } from './authDefaults';

export const authSlice = createSlice({
  name: 'auth',
  initialState: authDefaults,
  reducers: {
    userSignedIn: (
      state: AuthState,
      { payload }: PayloadAction<AuthenticatedState>
    ): AuthenticatedState => {
      window.localStorage.setItem('auth', JSON.stringify(payload));
      return payload;
    },
    updateUserData: (state: AuthState, { payload }: PayloadAction<Partial<User>>): void => {
      if (state.isAuthenticated) {
        state.user = { ...state.user, ...payload };
      }
    },
    userSignedOut: (state: AuthState): UnauthenticatedState => {
      window.clearTimeout((state as AuthenticatedState).token?.timeout);
      window.localStorage.removeItem('auth');
      return { isAuthenticated: false };
    },
  },
});

export const { userSignedIn, userSignedOut, updateUserData } = authSlice.actions;
