import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { App, AppStoreProvider } from 'components';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AppStoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppStoreProvider>
);
