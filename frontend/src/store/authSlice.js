import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogin: false,
  userDetail: null,
  token: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isUserLogin = true;
      state.userDetail = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
        state =  initialState;
    },
  },
});

export default authSlice;
export const { login, logout } = authSlice.actions;
