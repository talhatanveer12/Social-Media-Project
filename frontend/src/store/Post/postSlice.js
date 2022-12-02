import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  userPost: []
};

const postSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    getPost: (state, action) => {
      const post = action.payload.post;
      state.userPost = post.filter((data) => data.userId === action.payload.id);
      state.post = action.payload.post;

    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setPostLike: (state, action) => {
      const updatedPosts = state.post.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.post = updatedPosts;
    },
    getUserPost: (state,action) => {
      state.userPost = action.payload;
    }
  },
});

export default postSlice;
export const { getPost, setPost, setPostLike,getUserPost } = postSlice.actions;
