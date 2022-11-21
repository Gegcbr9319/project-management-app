import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticatedState, AuthState, UnauthenticatedState } from 'model/auth';
import { authDefaults } from './authDefaults';

const authSlice = createSlice({
  name: 'auth',
  initialState: authDefaults as AuthState,
  reducers: {
    userSignedIn: (
      state: AuthState,
      { payload }: PayloadAction<AuthenticatedState>
    ): AuthenticatedState => payload,
    userSignedOut: (): UnauthenticatedState => ({ isAuthenticated: false }),
  },
});

export default authSlice.reducer;
export const { userSignedIn, userSignedOut } = authSlice.actions;
