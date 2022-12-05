import axiosInstance, { axiosFileInstance } from "../../Http-Request/axios-instance";
import socket from "../../Socket";
import { getOtherUser } from "../User/userSlice";
import { getPost, getUserPost, setPost, setPostLike } from "./postSlice";


export const getAllPost = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get('/post/all-post');
        if(res.status === 200) {
            dispatch(getPost({post: res.data.post,id: res.data.id._id}));
        }
        return res;
    } catch (error) {
        
    }
}

export const getUserAllPost = (id) => async (dispatch) => {
    try {
        const res = await axiosInstance.get(`post/get-post/${id}`);
        if(res.status === 200) {
            dispatch(getUserPost(res.data.post));
            dispatch(getOtherUser(res.data.user));
        }
    } catch (error) {
        
    }
}

export const createPost = (data) => async (dispatch) => {
    try {
        const res = await axiosFileInstance.post('/post/create',data);
        if(res.status === 200) {
            dispatch(setPost(res.data.post));
            socket.emit("create_post", {message: res.data.post});
        }
        return res;
    } catch (error) {
        
    }
}

export const addPostComment = (data,postId) => async (dispatch) => {
    try {
        const res = await axiosInstance.post(`/post/${postId}/comments`,data);
        if(res.status === 200) {
            dispatch(setPost(res.data.post));
            socket.emit("add_comments", {message: res.data.post});
        }
    } catch (error) {
        
    }
}

export const addPostLike = (data,postId) => async (dispatch) => {
    try {
        const res = await axiosInstance.patch(`/post/${postId}/likes`,data);
        if(res.status === 200) {
            dispatch(setPostLike({post: res.data}));
            socket.emit("add_likes", {message: res.data});
        }
    } catch (error) {
        
    }
}