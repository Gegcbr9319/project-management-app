import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeleteCallback, DeleteState } from 'models';

const initialState: DeleteState = {
  callback: null,
};

export const deleteSlice = createSlice({
  name: 'delete',
  initialState,
  reducers: {
    setDeleteCallback(state, { payload: newCallback }: PayloadAction<DeleteCallback>) {
      Object.assign(state, { callback: newCallback });
    },
    clearDeleteCallback(state) {
      Object.assign(state, { callback: null });
    },
  },
});

export const { setDeleteCallback, clearDeleteCallback } = deleteSlice.actions;
