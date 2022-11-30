import axiosInstance from "../../Http-Request/axios-instance";
import { getUserDetail } from "../User/userSlice";
import { login, profile } from "./authSlice";

export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    if (res.data.status === "Login") {
      dispatch(login({ token: res.data.token}));
      dispatch(getUserDetail({detail : res.data.detail,follower: res.data.follower,following: res.data.following}))
    }
    return res;
  } catch (error) {
    return error.response;
  }
};

export const loadUser = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get('/user/me');
        if(res.data) {
            dispatch(profile(res.data));
            dispatch(getUserDetail({detail : res.data.detail,follower: res.data.follower,following: res.data.following}))
        }
    } catch (error) {
        
    }
}
