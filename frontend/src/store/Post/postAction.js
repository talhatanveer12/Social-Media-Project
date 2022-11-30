import axiosInstance, { axiosFileInstance } from "../../Http-Request/axios-instance";
import { getPost, setPost, setPostLike } from "./postSlice";


export const getAllPost = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get('/post/all-post');
        if(res.status === 200) {
            dispatch(getPost(res.data.post));
        }
        return res;
    } catch (error) {
        
    }
}

export const createPost = (data) => async (dispatch) => {
    try {
        const res = await axiosFileInstance.post('/post/create',data);
        if(res.status === 200) {
            dispatch(setPost(res.data.post));
        }
    } catch (error) {
        
    }
}

export const addPostComment = (data,postId) => async (dispatch) => {
    try {
        const res = await axiosInstance.post(`/post/${postId}/comments`,data);
        if(res.status === 200) {
            dispatch(setPost(res.data.post));
        }
    } catch (error) {
        
    }
}

export const addPostLike = (data,postId) => async (dispatch) => {
    try {
        const res = await axiosInstance.patch(`/post/${postId}/likes`,data);
        if(res.status === 200) {
            dispatch(setPostLike({post: res.data}));
        }
    } catch (error) {
        
    }
}