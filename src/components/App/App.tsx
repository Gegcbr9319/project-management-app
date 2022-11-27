import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  SignUpPage,
  SignInPage,
  WelcomePage,
  PageNotFound,
  BoardsPage,
  BoardPage,
  EditProfilePage,
} from 'pages';
import {
  Navigation,
  Footer,
  ProtectedRouter,
  ProtectedRoute,
  SignOut,
  ErrorMessage,
  ErrorBoundary,
} from 'components';
import styles from './App.module.scss';

export function App() {
  return (
    <ErrorBoundary>
      <ProtectedRouter>
        <Navigation />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/boards"
              element={
                <ProtectedRoute redirectIf="unauthenticated">
                  <BoardsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/boards/:id"
              element={
                <ProtectedRoute redirectIf="unauthenticated">
                  <BoardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <ProtectedRoute redirectIf="authenticated">
                  <SignInPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute redirectIf="authenticated">
                  <SignUpPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute redirectIf="unauthenticated">
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signout"
              element={
                <ProtectedRoute redirectIf="unauthenticated">
                  <SignOut />
                </ProtectedRoute>
              }
            />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          <ErrorMessage />
        </main>
        <Footer />
      </ProtectedRouter>
    </ErrorBoundary>
  );
}
