import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: 'dark'
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state,action) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        }
    }
})

export default themeSlice;
export const {setTheme} = themeSlice.actions;