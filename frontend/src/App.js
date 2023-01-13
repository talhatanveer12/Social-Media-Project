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
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
//import "./firebase/firebaseNotifiaction";

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
      <Route path="/Message" element={<Message />} />
      <Route
        path="/Message/:id"
        element={
          <Message/>
        }
      />
    </React.Fragment>
  )
);

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.Auth);
  const { detail } = useSelector((state) => state.User);
  const { mode } = useSelector((state) => state.Theme);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BC6_FPOqRrwUw5qIKjiwM6dwuBrfZ59MT0cm07hHybcI099HwiYUt0mZnzp8cYCht9LWs7PI1mnQqpwAxyh0_Yg",
      });
      console.log("Token Gen", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);

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
