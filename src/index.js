import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfirmProvider } from './APP/Common/Confirm/ConfirmContext';
import { AlertProvider } from './APP/Common/Alert/AlertContext';
import "../src/static/fonts/font.css";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ConfirmProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </ConfirmProvider>
  </React.StrictMode>
);