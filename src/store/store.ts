import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { appApi } from 'api';

const appReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [appApi.reducerPath]: appApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<AppState>) => {
  return configureStore({
    reducer: appReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: ['payload', 'meta'],
          ignoredPaths: ['auth.token'],
        },
      }).concat(appApi.middleware),
  });
};

export const store: AppStore = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
