import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse, ErrorState } from 'models';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {} as ErrorState,
  reducers: {
    setError(state: ErrorState, { payload: error }: PayloadAction<ErrorResponse>): ErrorState {
      return { error };
    },
    clearError(): ErrorState {
      return {};
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
