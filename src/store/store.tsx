import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';

const appReducer = combineReducers({
  auth: authSlice,
});

export const setupStore = (preloadedState?: PreloadedState<AppState>) => {
  return configureStore({
    reducer: appReducer,
    preloadedState,
  });
};

export const store: AppStore = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
