import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../../Interfaces";

export const initialState: UserModel = {
  sub: "",
  email: "",
  role: "",
  unique_name: "",
};

export const AuthentiacationSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.sub = action.payload.sub;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.unique_name = action.payload.unique_name;
    },
  },
});

export const { setLoggedInUser } = AuthentiacationSlice.actions;
export const AuthentiacationReducer = AuthentiacationSlice.reducer;
