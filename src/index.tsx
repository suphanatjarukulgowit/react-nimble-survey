import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { createRoot } from 'react-dom/client';

import { AuthProvider } from 'contexts/AuthProvider';

import App from './App';
import configureI18n from './i18n';
import reportWebVitals from './reportWebVitals';

configureI18n();

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Suspense fallback="loading">
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
