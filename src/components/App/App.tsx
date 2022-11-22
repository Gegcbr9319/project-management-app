import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SignUpPage, SignInPage, MainPage, PageNotFound, BoardsPage } from 'pages';
import { Navigation, Footer } from 'components';
import styles from './App.module.scss';
import { PrivateRoute, ProtectedRouter, PublicRoute } from 'specialRoutes';

export function App() {
  return (
    <ProtectedRouter>
      <>
        <Navigation />
        <main className={styles.main}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Navigate to="/boards" replace />
                </PrivateRoute>
              }
            />
            <Route path="/main" element={<MainPage />} />
            <Route
              path="/boards"
              element={
                <PrivateRoute>
                  <BoardsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <PublicRoute>
                  <SignInPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUpPage />
                </PublicRoute>
              }
            />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <Footer />
      </>
    </ProtectedRouter>
  );
}
