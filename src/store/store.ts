import { configureStore } from '@reduxjs/toolkit';
import { managerAppApi, tokenSlice } from 'store';

export const store = configureStore({
  reducer: {
    [managerAppApi.reducerPath]: managerAppApi.reducer,
    [tokenSlice.name]: tokenSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(managerAppApi.middleware),
});
