import ItemCartModel from "./ItemCartModel";

export default interface ShoppingCartModel {
  id?: number;
  userId?: string;
  cartItems?: ItemCartModel[];
  cartTotal?: number;
}