import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import ErrorPage from "./pages/ErrorPage";
import { childrenRoutes } from "./components/MainRoute";
import theme from "./styles/theme";
import {Button} from "@mui/material";
import * as React from "react";
//import "./App.scss";


function App() {

  // const theme = createTheme({
  //   typography: {
  //     fontFamily: "Inter, sans-serif",
  //     h1: {
  //       fontFamily: "Inter, sans-serif",
  //     },
  //     h2: {
  //       fontFamily: "Inter, sans-serif",
  //     },
  //     h3: {
  //       fontFamily: "Inter, sans-serif",
  //     },
  //     h4: {
  //       fontFamily: "Inter, sans-serif",
  //     },
  //   },
  // });

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
