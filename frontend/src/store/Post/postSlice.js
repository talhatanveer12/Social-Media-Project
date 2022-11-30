import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
};

const postSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    getPost: (state, action) => {
      state.post = action.payload;
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
  },
});

export default postSlice;
export const { getPost, setPost, setPostLike } = postSlice.actions;
