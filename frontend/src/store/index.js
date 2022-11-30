import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/authSlice";
import postSlice from "./Post/postSlice";
import themeSlice from "./themeSlice";
import userSlice from "./User/userSlice";


const store  = configureStore({
    reducer : {
        Theme: themeSlice.reducer,
        Auth: authSlice.reducer,
        User: userSlice.reducer,
        Post: postSlice.reducer,
    }
})

export default store;