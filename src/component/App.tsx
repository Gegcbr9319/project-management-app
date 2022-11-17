import React from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import { SignUpPage, SignInPage, MainPage, PageNotFound, BoardsPage } from '../page';

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
