import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './css/index.css';
import newRouter from './core/router';
import { RouterProvider } from 'react-router5';
import Store from './core/store';

const store = new Store();
const router = newRouter(store);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
);
router.start();
