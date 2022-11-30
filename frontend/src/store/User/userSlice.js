import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    detail: null,
    followers: [],
    followings: [],
    totalFollower: null,
    totalFollowing: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserDetail: (state,action) => {
            state.detail = action.payload.detail;
            state.followers = action.payload.follower;
            state.followings = action.payload.following;
            state.totalFollower = action.payload.follower.length;
            state.totalFollowing = action.payload.following.length;
        }
    },
});

export default userSlice;
export const {getUserDetail} = userSlice.actions;


