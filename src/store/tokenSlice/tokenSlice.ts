import { createSlice } from '@reduxjs/toolkit';
import { IToken, Token } from './token';

const { value, time, decoded, isValid, timeout } = new Token();
const initialState: IToken = { value, time, decoded, isValid, timeout };

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(token, action) {
      Object.assign(token, action.payload.token);
    },
  },
});

export const { setToken } = tokenSlice.actions;
