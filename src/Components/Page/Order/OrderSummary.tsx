import React, { useState } from "react";
import {
  ItemCartModel,
  ShoppingCartModel,
  UserModel,
} from "../../../Interfaces";
import { SD_Roles, SD_Status } from "../../../Utility/SD";
import { getStatusColor } from "../../../Helper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useUpdateOrderMutation } from "../../../Api/OrderApi";
import { MainLoader } from "../../Common";

type Props = {
  ApiResult: {
    id?: number;
    cartItems?: ShoppingCartModel[];
    cartTotal?: number;
    userId?: string;
    stripePaymentIntentId?: string;
    status?: SD_Status;
  };
  OrderSummary: {
    grandTotal: number;
    totalItems: number;
  };
  userInput: {
    email: string;
    phoneNumber: string;
    name: string;
  };
};
function OrderSummaryy(props: Props) {
  const statusColor = getStatusColor(props.ApiResult.status!);
  const navigate = useNavigate();
  const userData: UserModel = useSelector(
    (state: RootState) => state.authentiacationStore
  );
  const [isLoading, setIsLoading] = useState(false);

  const nextStatus: any =
    props.ApiResult.status! === SD_Status.CONFIRMED
      ? { color: "info", value: SD_Status.BEING_COOKED }
      : props.ApiResult.status! === SD_Status.BEING_COOKED
      ? { color: "warning", value: SD_Status.READY_FOR_PICKUP }
      : props.ApiResult.status! === SD_Status.READY_FOR_PICKUP && {
          color: "success",
          value: SD_Status.COMPLETED,
        };

  const [updateOrder] = useUpdateOrderMutation();
  const handleCancel = async () => {
    setIsLoading(true);
    await updateOrder({
      id: props.ApiResult.id,
      status: SD_Status.CANCELLED,
    });
    setIsLoading(false);
  };
  const handleNextStatus = async () => {
    setIsLoading(true);
    const response = await updateOrder({
      id: props.ApiResult.id,
      status: nextStatus.value,
    });
    console.log(response)
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <MainLoader></MainLoader>}
      {!isLoading && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
            <span className={`btn btn-outline-${statusColor} fs-6`}>
              {props.ApiResult.status}{" "}
            </span>
          </div>
          <div className="mt-3">
            <div className="border py-3 px-2">
              Name : {props.userInput.name}
            </div>
            <div className="border py-3 px-2">
              Email : {props.userInput.email}
            </div>
            <div className="border py-3 px-2">
              Phone : {props.userInput.phoneNumber}
            </div>
            <div className="border py-3 px-2">
              <h4 className="text-success">Menu Items</h4>
              <div className="p-3">
                {props.ApiResult.cartItems?.map(
                  (cartItem: ItemCartModel, index: number) => {
                    return (
                      <div className="d-flex" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                          <p>{cartItem.menuItem?.name}</p>
                          <p>
                            {cartItem.menuItem?.price} x {cartItem.quantity} =
                          </p>
                        </div>
                        <p style={{ width: "70px", textAlign: "right" }}>
                          $
                          {(cartItem.menuItem?.price ?? 0) *
                            (cartItem.quantity ?? 0)}
                        </p>
                      </div>
                    );
                  }
                )}

                <hr />
                <h4 className="text-danger" style={{ textAlign: "right" }}>
                  ${props.OrderSummary.grandTotal.toFixed(2)}
                </h4>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back To Previous
            </button>
            {userData.role === SD_Roles.Admin ? (
              <div className="d-flex">
                {props.ApiResult.status !== SD_Status.CANCELLED &&
                  props.ApiResult.status !== SD_Status.COMPLETED && (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}
                <button
                  className={`btn btn-${nextStatus.color}`}
                  onClick={handleNextStatus}
                >
                  {nextStatus.value}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummaryy;
