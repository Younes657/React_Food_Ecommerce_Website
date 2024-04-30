import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast_notification } from "../../Helper";
import { useState } from "react";
import {
  ApiResponse,
  ItemCartModel,
  OrderDetailsModel,
  ShoppingCartModel,
} from "../../Interfaces";
import { useCreateOrderMutation } from "../../Api/OrderApi";
import { SD_Status } from "../../Utility/SD";
import { useNavigate } from "react-router-dom";

type Props = {
  Data: ShoppingCartModel;
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

const PaymentForm = ({ Data, OrderSummary, userInput }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createOrder] = useCreateOrderMutation()
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toast_notification("An unexpected error occured.", "error");
      setIsProcessing(false);
      console.log(result.error.message);
    } else {
      console.log(result);

      const orderDetailsDTO: OrderDetailsModel[] = [];
      Data.cartItems?.forEach((item: ItemCartModel) => {
        var tempOrderDetail: OrderDetailsModel = {
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          itemName: item.menuItem?.name,
          price: item.menuItem?.price,
          // orderHeaderId?: number,
        };
        orderDetailsDTO.push(tempOrderDetail);
      });

      const response : ApiResponse = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        PickupEmail: userInput.email,
        userId: Data.userId!,
        orderTotal: OrderSummary.grandTotal,
        stripePaymentIntentID: Data.stripePaymentIntentId,
        status: result.paymentIntent.status === "succeeded" ? SD_Status.CONFIRMED : SD_Status.PENDING,
        totalItems: OrderSummary.totalItems,
        orderDetailsDTO: orderDetailsDTO
      }) 
      console.log(response)
      if(response.data?.result?.status  === SD_Status.CONFIRMED){
          navigate(`/Order/OrderConfirmed/${response.data?.result?.id}`)
      }else{
        navigate("/Failed") 
      }
    }
    setIsProcessing(false)
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled ={!stripe || isProcessing} className="btn btn-success mt-5 w-100">
        {isProcessing ? "Processing ..." : "Submit"}
        </button>
    </form>
  );
};

export default PaymentForm;
