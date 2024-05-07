import React, { useEffect, useState } from "react";
import { inputHelper } from "../../../Helper";
import { ApiResponse, UserModel } from "../../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { MiniLoader } from "../../Common";
import { useNavigate } from "react-router-dom";
import { useInitiatePaymentMutation } from "../../../Api/PaymentApi";
type Props = {
  grandTotal: number;
  totalItems: number;
};
function UserDetailsCart(props: Props) {
  const userData: UserModel = useSelector(
    (state: RootState) => state.authentiacationStore
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [initialPayment] = useInitiatePaymentMutation();

  const initialUserData = {
    name: userData.unique_name,
    email: userData.email,
    phoneNumber: "",
  };
  const [userInput, setUserInput] = useState(initialUserData);
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  useEffect(() => {
    // because when the page refresh the feilds email and name becomes empty
    setUserInput({
      name: userData.unique_name,
      email: userData.email,
      phoneNumber: "",
    });
  }, [userData]);
  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    //we should add payment credential here
    const response: ApiResponse = await initialPayment(userData.sub);
    const OrderSummary = {
      grandTotal: props.grandTotal,
      totalItems: props.totalItems,
    };
    console.log(response);
    navigate("/Payment", {
      state: { ApiResult: response.data?.result, OrderSummary, userInput },
    });
  };
  return (
    <form className="col-10 mx-auto" onSubmit={handlePlaceOrder}>
      <div className="form-group mt-3">
        Pickup Name
        <input
          type="text"
          value={userInput.name}
          onChange={handleUserInput}
          className="form-control"
          placeholder="name..."
          name="name"
          required
        />
      </div>
      <div className="form-group mt-3">
        Pickup Email
        <input
          type="email"
          value={userInput.email}
          onChange={handleUserInput}
          className="form-control"
          placeholder="email..."
          name="email"
          required
        />
      </div>

      <div className="form-group mt-3">
        Pickup Phone Number
        <input
          type="number"
          value={userInput.phoneNumber}
          onChange={handleUserInput}
          className="form-control"
          placeholder="phone number..."
          name="phoneNumber"
          required
        />
      </div>
      <div className="form-group mt-3">
        <div className="card p-3" style={{ background: "ghostwhite" }}>
          <h5>Grand Total : ${props.grandTotal.toFixed(2)}</h5>
          <h5>No of items : {props.totalItems}</h5>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-lg btn-success form-control mt-3"
      >
        {isLoading ? <MiniLoader></MiniLoader> : "Looks Good? Place Order!"}
      </button>
    </form>
  );
}

export default UserDetailsCart;
