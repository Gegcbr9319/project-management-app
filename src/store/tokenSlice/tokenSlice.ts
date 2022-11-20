import { createSlice } from '@reduxjs/toolkit';
import { Token } from './token';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: new Token(),
  reducers: {
    setToken(token, action) {
      token = new Token(action.payload.value);
    },
  },
});

export const { setToken } = tokenSlice.actions;
