import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  //user: null

};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      //state.user = action.payload.user;
      localStorage.setItem('token',action.payload.token);
    },
    logout: (state) => {
        state =  initialState;
    },
    profile: (state,action) => {
      state.user = action.payload;
    }
  },
});

export default authSlice;
export const { login, logout,profile } = authSlice.actions;
