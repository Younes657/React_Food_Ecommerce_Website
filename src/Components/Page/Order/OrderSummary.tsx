import React from "react";
import { ItemCartModel, ShoppingCartModel } from "../../../Interfaces";

type Props = {
  ApiResult : ShoppingCartModel,
  OrderSummary : {
    grandTotal :  number,
    totalItems : number,
  }
  userInput: {
    email: string;
    phoneNumber: string;
    name: string;
  };
};
function OrderSummaryy(props: Props) {
  return (
    <div>
      {" "}
      <h3 className="text-success">Order Summary</h3>
      <div className="mt-3">
        <div className="border py-3 px-2">Name : {props.userInput.name}</div>
        <div className="border py-3 px-2">Email : {props.userInput.email}</div>
        <div className="border py-3 px-2">
          Phone : {props.userInput.phoneNumber}
        </div>
        <div className="border py-3 px-2">
          <h4 className="text-success">Menu Items</h4>
          <div className="p-3">
            {props.ApiResult.cartItems?.map((cartItem: ItemCartModel, index: number) => {
              return (
                <div className="d-flex" key={index}>
                  <div className="d-flex w-100 justify-content-between">
                    <p>{cartItem.menuItem?.name}</p>
                    <p>{cartItem.menuItem?.price} x {cartItem.quantity} =</p>
                  </div>
                  <p style={{ width: "70px", textAlign: "right" }}>${(cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)}</p>
                </div>
              );
            })}

            <hr />
            <h4 className="text-danger" style={{ textAlign: "right" }}>
              ${props.OrderSummary.grandTotal.toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryy;
