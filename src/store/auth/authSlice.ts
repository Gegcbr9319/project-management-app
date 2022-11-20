import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticatedState, AuthState } from 'model/auth';
import { authDefaults } from './authDefaults';

const authSlice = createSlice({
  name: 'auth',
  initialState: authDefaults as AuthState,
  reducers: {
    userSignedIn: (
      state: AuthState,
      { payload }: PayloadAction<AuthenticatedState>
    ): AuthenticatedState => payload,
  },
});

export default authSlice.reducer;
export const { userSignedIn } = authSlice.actions;
