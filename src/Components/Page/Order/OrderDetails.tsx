import React from "react";
import { useParams } from "react-router-dom";
import { useGetSpecifiqueOrderQuery } from "../../../Api/OrderApi";
import OrderSummaryy from "./OrderSummary";

function OrderDetails() {
  const { OrderId } = useParams();
  const { data, isLoading } = useGetSpecifiqueOrderQuery(OrderId);
  console.log(data);
  let userInput, OrderDetails;
  let orderSummary;
  if (!isLoading && data.result) {
    userInput = {
      email: data.result.pickupEmail,
      phoneNumber: data.result.pickupPhoneNumber,
      name: data.result.pickupName,
    };
    
    OrderDetails = {
      id: data.result.id,
      cartItems: data.result.orderDetails,
      userId: data.result.userId,
      stripePaymentIntentId: data.result.stripePaymentIntentID,
      status: data.result.status,
    };
    orderSummary = {
      grandTotal: data.result.orderTotal,
      totalItems: data.result.totalItems,
    };
  }

  return (<div className="container my-5 mx-auto p-5 w-100" style={{maxWidth:"750px"}}>
    {!isLoading && OrderDetails && userInput &&
        <OrderSummaryy userInput={userInput}  ApiResult={OrderDetails} OrderSummary ={orderSummary as { grandTotal: number; totalItems: number; }}></OrderSummaryy>
    }
  </div>);
}

export default OrderDetails;
