import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SignUpPage, SignInPage, MainPage, PageNotFound, BoardsPage } from 'pages';
import { Board } from 'components';
import { PrivateRoute, ProtectedRouter } from 'specialRoutes';

export function App() {
  return (
    <ProtectedRouter>
      <>
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
            path="/boards/:id"
            element={
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            }
          />
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
              <PrivateRoute isPublic={true}>
                <SignInPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PrivateRoute isPublic={true}>
                <SignUpPage />
              </PrivateRoute>
            }
          />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </>
    </ProtectedRouter>
  );
}
