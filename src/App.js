import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import { ThemeProvider } from "@mui/material/styles";
import ErrorPage from "./pages/ErrorPage";
import { childrenRoutes } from "./components/MainRoute";
import theme from "./styles/theme";
import * as React from "react";
//import "./App.scss";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: childrenRoutes,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
