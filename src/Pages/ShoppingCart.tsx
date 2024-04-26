import React from "react";
import { CartSummary, UserDetailsCart } from "../Components/Page/Cart";
import { useSelector } from "react-redux";
import { ItemCartModel } from "../Interfaces";
import { RootState } from "../Storage/Redux/store";
import { withAuth } from "../HOC";

function ShoppingCart() {
  const ItemCarts: ItemCartModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  let grandTotal  = 0;
  let totalItems = 0;

  ItemCarts.forEach(element => {
    totalItems += element.quantity ??  0 ;
    grandTotal += (element.quantity ?? 0)  * (element.menuItem?.price ?? 0);
  });
  return (
    <div className=" container">
      <div className="row py-4 g-5">
        <div className="col-lg-6 col-12 px-5 ">
          <h3 className=" text-success text-center pb-2">Cart Summary</h3>
          {!ItemCarts ? (
            <div className="text-center pt-4">No Cart selected ...</div>
          ) : (
            ItemCarts.map((itemCart: ItemCartModel, index: number) => (
              <CartSummary key={index} carts={itemCart}></CartSummary>
            ))
          )}
        </div>
        <div className="col-lg-6 col-12 border pb-3">
          <h3 className=" text-success text-center p-2 border-bottom">User Details</h3>
          <UserDetailsCart grandTotal= {grandTotal} totalItems = {totalItems}></UserDetailsCart>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ShoppingCart) ;
