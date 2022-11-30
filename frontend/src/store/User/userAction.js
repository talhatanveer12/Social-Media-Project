import axiosInstance from "../../Http-Request/axios-instance";

export const getUserDetail = (userId) => async (dispatch) => {
    try {
        const res = await axiosInstance.get(`/user/${userId}`);
        if(res.status === 200) {
            return res.data;
        }
    } catch (error) {
        
    }
}