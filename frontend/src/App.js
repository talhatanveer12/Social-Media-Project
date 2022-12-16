import "./App.css";
import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import VerifyUser from "./pages/Auth/VerifyUser";
import { loadUser } from "./store/Auth/authAction";
import EditProfile from "./pages/Profile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Message from "./pages/Message";

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
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/Profile/:id" element={<Profile />} />
      <Route path="/Message" element={<Message/>} />
    </React.Fragment>
  )
);

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.Auth);
  const { detail } = useSelector((state) => state.User);
  const { mode } = useSelector((state) => state.Theme);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    if (token && !detail) {
      dispatch(loadUser());
    }
  }, [dispatch, token, detail]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
