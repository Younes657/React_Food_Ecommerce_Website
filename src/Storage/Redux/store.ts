import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./Slice/MenuItemSlice";
import { MenuItemApi } from "../../Api";

const store = configureStore({
    reducer: {
        menuItemStore: menuItemReducer,
        [MenuItemApi.reducerPath] : MenuItemApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(MenuItemApi.middleware)
});

export default store;
export type RootState = ReturnType<typeof store.getState>