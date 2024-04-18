import React from "react";
import { ItemCartModel } from "../../../Interfaces";
import { useDispatch } from "react-redux";
import {
  RemoveCart,
  updateQuantity,
} from "../../../Storage/Redux/Slice/ShoppingCartSlice";
import { useUpsertShoppingCartMutation } from "../../../Api/ShoppingCartApi";
interface Props {
  carts: ItemCartModel;
  key: number;
}

function CartSummary(props: Props) {
  const dispatch = useDispatch();
  const [updateQuantityApi] = useUpsertShoppingCartMutation();

  const handleQuantity = async (UpQby: number) => {
    if (UpQby === 0 || props.carts.quantity === 1) {
      await updateQuantityApi({
        UserId: "09920cdc-9d7a-4346-95d1-800c6cdf7028",
        MenuId: props.carts.menuItemId,
        UpQuaBy: 0,
      });
      dispatch(RemoveCart({ cartItem: props.carts }));
    } else {
      await updateQuantityApi({
        UserId: "09920cdc-9d7a-4346-95d1-800c6cdf7028",
        MenuId: props.carts.menuItemId,
        UpQuaBy: UpQby,
      });
      dispatch(
        updateQuantity({
          cartItem: props.carts,
          quantity: props.carts.quantity! + UpQby,
        })
      );
    }
  };

  return (
    <div
      className="row mb-3 align-items-center"
      style={{ backgroundColor: "ghostwhite" }}
    >
      <div className="col-3">
        <img
          src={props.carts.menuItem?.image}
          className="w-100  rounded-circle"
          alt="item"
        />
      </div>
      <div className="col-9 p-3 ">
        <div className="d-flex justify-content-between  align-items-center">
          <p className=" m-0 fs-4">{props.carts.menuItem?.name}</p>
          <p className=" fw-bold fs-5 m-0">
            ${(props.carts.quantity! * props.carts.menuItem?.price!).toFixed(2)}
          </p>
        </div>
        <p className="text-danger fw-bold fs-5 m-1">
          ${props.carts.menuItem?.price!}
        </p>
        <div className="d-flex justify-content-between  align-items-center">
          <div>
            <i
              className="bi bi-plus-circle-fill text-secondary"
              style={{ cursor: "pointer" }}
              onClick={() => handleQuantity(1)}
            ></i>
            <span className=" mx-3">{props.carts.quantity!}</span>
            <i
              className="bi bi-dash-circle-fill text-secondary"
              style={{ cursor: "pointer" }}
              onClick={() => handleQuantity(-1)}
            ></i>
          </div>
          <button className="btn btn-danger " onClick={() => handleQuantity(0)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
