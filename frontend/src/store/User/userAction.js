import axiosInstance from "../../Http-Request/axios-instance";
import { getAllUser } from "./userSlice";

export const getUserDetail = (userId) => async (dispatch) => {
    try {
        const res = await axiosInstance.get(`/user/${userId}`);
        if(res.status === 200) {
            return res.data;
        }
    } catch (error) {
        
    }
}

export const registerUser = (data) => async (dispatch) => {
    try {
        const res = await axiosInstance.post('/auth/register',data);
        return res;
    } catch (error) {
        return error.response;
    }
}

export const getAllUserDetail = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get("/user/all-user");
        if(res.status === 200){
            dispatch(getAllUser(res.data.user));
        }
        return res;
    } catch (error) {
        
    }
}