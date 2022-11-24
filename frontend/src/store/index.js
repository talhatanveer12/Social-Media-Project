import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import themeSlice from "./themeSlice";

const store  = configureStore({
    reducer : {
        Theme: themeSlice.reducer,
        Auth: authSlice.reducer,
    }
})

export default store;