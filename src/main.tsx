import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './routes/home-page';
import NewCharacterPage from './routes/new-character-page';
import RootPage from './routes/root-page';
import ErrorPage from './routes/error-page';
import RootErrorPage from './routes/root-error-page';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootPage/>,
      errorElement: <RootErrorPage/>,
      children: [
        {
          errorElement: <ErrorPage/>,
          children: [
            {
              index: true,
              element: <HomePage/>,
            },
            {
              path: "/new",
              element: <NewCharacterPage/>,
            }
          ],
        },
      ],
    },
  ],
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
