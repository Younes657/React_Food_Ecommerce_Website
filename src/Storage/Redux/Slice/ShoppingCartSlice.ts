import { createSlice } from "@reduxjs/toolkit";
import { ShoppingCartModel } from "../../../Interfaces";

const initialState : ShoppingCartModel= {
    cartItems : []
}

export const ShoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState :initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        updateQuantity: (state, action) => {
            state.cartItems = state.cartItems?.map(item =>{
                if(item.id === action.payload.cartItem.id)
                    item.quantity = action.payload.quantity
                return item
            })
        },
        RemoveCart: (state, action) => {
            state.cartItems = state.cartItems?.filter(item =>{
                return item.id !== action.payload.cartItem.id
            })
        }
    }
})

export const { setCartItems , updateQuantity , RemoveCart } = ShoppingCartSlice.actions;
export const ShoppingCartReducer= ShoppingCartSlice.reducer;