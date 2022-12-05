import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    detail: null,
    followers: [],
    followings: [],
    totalFollower: null,
    totalFollowing: null,
    user: null,
    otherUserDetail: [],
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
        },
        getAllUser: (state,action) => {
            state.user = action.payload;
        },
        getOtherUser: (state,action) => {
            state.otherUserDetail = action.payload
        },
        updateFollowing: (state,action) => {
            state.followings = action.payload.following;
            state.otherUserDetail.followers = action.payload.follower ? action.payload.follower : [];
        },
        updateProfile: (state,action) => {
            state.detail = action.payload.detail;
            state.followers = action.payload.follower;
            state.followings = action.payload.following;
        }
    },
});

export default userSlice;
export const {getUserDetail,getAllUser,getOtherUser,updateFollowing,updateProfile} = userSlice.actions;


