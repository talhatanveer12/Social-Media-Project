import './App.css';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

const router =  createBrowserRouter(createRoutesFromElements(
  <React.Fragment>
    <Route path='/Login' element={<Login/>} />
    <Route path='/Register' element={<Register/>} />
  </React.Fragment>
))


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
