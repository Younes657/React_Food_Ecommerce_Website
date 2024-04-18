import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./Slice/MenuItemSlice";
import { AuthenticationApi, MenuItemApi } from "../../Api";
import { ShoppingCartApi } from "../../Api";
import { ShoppingCartReducer } from "./Slice/ShoppingCartSlice";
import { AuthentiacationReducer } from "./Slice/AuthentiacationSlice";

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore: ShoppingCartReducer,
    authentiacationStore: AuthentiacationReducer,
    [MenuItemApi.reducerPath]: MenuItemApi.reducer,
    [ShoppingCartApi.reducerPath]: ShoppingCartApi.reducer,
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(MenuItemApi.middleware)
      .concat(ShoppingCartApi.middleware)
      .concat(AuthenticationApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
