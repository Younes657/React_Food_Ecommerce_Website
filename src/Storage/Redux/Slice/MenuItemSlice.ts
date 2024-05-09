import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuItem : [],
    searchValue : ""
}

export const menuItemSlice = createSlice({
    name: "menuItem",
    initialState :initialState,
    reducers: {
        setMenuItem: (state, action) => {
            state.menuItem = action.payload;
        },
        setSearchItem: (state, action) => {
            state.searchValue = action.payload;
        }
    }
})

export const { setMenuItem , setSearchItem } = menuItemSlice.actions;
export const menuItemReducer= menuItemSlice.reducer;