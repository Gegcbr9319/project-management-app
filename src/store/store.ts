import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { appApi, authSlice, errorSlice, deleteSlice } from 'store';

const appReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [deleteSlice.name]: deleteSlice.reducer,
  [appApi.reducerPath]: appApi.reducer,
  [errorSlice.name]: errorSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<AppState>) => {
  return configureStore({
    reducer: appReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: ['payload', 'meta'],
          ignoredPaths: ['auth.token', 'delete.callback'],
        },
      }).concat(appApi.middleware),
  });
};

export const store: AppStore = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
