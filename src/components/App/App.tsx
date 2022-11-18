import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SignUpPage, SignInPage, MainPage, PageNotFound, BoardsPage } from 'pages';
import { Navigation, Footer } from 'components';
import styles from './App.module.scss';

export function App() {
  return (
    <>
      <Navigation />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="/*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
