import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SignUpPage, SignInPage, WelcomePage, PageNotFound, BoardsPage, BoardPage } from 'pages';
import { Navigation, Footer, ProtectedRouter, PrivateRoute, SignOut } from 'components';
import styles from './App.module.scss';

export function App() {
  return (
    <ProtectedRouter>
      <Navigation />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/boards"
            element={
              <PrivateRoute>
                <BoardsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/boards/:id"
            element={
              <PrivateRoute>
                <BoardPage />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/signout"
            element={
              <PrivateRoute>
                <SignOut />
              </PrivateRoute>
            }
          />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </ProtectedRouter>
  );
}
