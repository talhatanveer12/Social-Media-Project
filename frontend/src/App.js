import "./App.css";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import VerifyUser from "./pages/Auth/VerifyUser";

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route
        path="/"
        element={
          <VerifyUser>
            <Home />
          </VerifyUser>
        }
      ></Route>
    </React.Fragment>
  )
);

function App() {
  const { mode } = useSelector((state) => state.Theme);
  //const mode = "dark";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
