import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticatedState, AuthState, UnauthenticatedState } from 'model/auth';
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
    userSignedOut: (state: AuthState): UnauthenticatedState => {
      window.clearTimeout((state as AuthenticatedState).token?.timeout);
      window.localStorage.removeItem('auth');
      return { isAuthenticated: false };
    },
  },
});

export const { userSignedIn, userSignedOut } = authSlice.actions;
