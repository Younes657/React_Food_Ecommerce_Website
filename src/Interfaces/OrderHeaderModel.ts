import OrderDetailsModel from "./OrderDetailsModel";

export default interface OrderHeaderModel {
  id?: number,
  pickupName: string,
  pickupPhoneNumber: string,
  PickupEmail: string,
  userId: string,
  orderTotal: number,
  orderDate?: Date,
  stripePaymentIntentID: string,
  status: string,
  totalItems: number,
  orderDetailsDTO: OrderDetailsModel[]
}
