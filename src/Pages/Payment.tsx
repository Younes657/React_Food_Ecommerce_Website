import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../Components/Payment/PaymentForm";
import { OrderSummaryy } from "../Components/Page/Order";
function Payment() {
  const {
    state: { ApiResult, OrderSummary, userInput },
  } = useLocation();
  const stripePromise = loadStripe(
    "pk_test_51OvnElRp9NpmyYRWAZGtMLv3HsBegjroW3dyE0jv81cfgnID4ZfyNAD0Q0DUE7gXZcE35Zu8W2HnfExJo012Fwzq00Xh3fMErg"
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret: ApiResult.clientSecret,
  };
  return (
      <Elements stripe={stripePromise} options={options}>
        <div className="container m-5 p-5">
          <div className="row">
            <div className="col-md-7">
              <OrderSummaryy
                userInput={userInput}
                ApiResult={ApiResult}
                OrderSummary={OrderSummary}
              ></OrderSummaryy>
            </div>
            <div className="col-md-4 offset-md-1">
            <h3 className="text-success">Payment</h3>
            <div className="mt-5">
              <PaymentForm  />
            </div>
          </div>
          </div>
        </div>
      </Elements>
  );
}

export default Payment;
