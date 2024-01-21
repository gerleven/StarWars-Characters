import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./routes/home-page";
import NewCharacterPage from "./routes/new-character-page";
import RootPage from "./routes/root-page";
import ErrorPage from "./routes/error-page";
import RootErrorPage from "./routes/root-error-page";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/custom-theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <RootErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/new",
            element: <NewCharacterPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
