import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./Slice/MenuItemSlice";
import { MenuItemApi } from "../../Api";
import { ShoppingCartApi } from "../../Api";
import { ShoppingCartReducer } from "./Slice/ShoppingCartSlice";

const store = configureStore({
    reducer: {
        menuItemStore: menuItemReducer,
        shoppingCartStore: ShoppingCartReducer,
        [MenuItemApi.reducerPath] : MenuItemApi.reducer,
        [ShoppingCartApi.reducerPath] : ShoppingCartApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(MenuItemApi.middleware).concat(ShoppingCartApi.middleware)
});

export default store;
export type RootState = ReturnType<typeof store.getState>