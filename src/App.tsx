import React from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import './App.css';
import { SignUpPage, SignInPage, MainPage, PageNotFound, BoardsPage } from './page';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
