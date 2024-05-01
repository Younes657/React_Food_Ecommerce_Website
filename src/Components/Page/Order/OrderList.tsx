import React from "react";
import { OrderHeaderModel } from "../../../Interfaces";
import { MainLoader } from "../../Common";
import { Link } from "react-router-dom";
import { getStatusColor } from "../../../Helper";
import { SD_Status } from "../../../Utility/SD";
type props = {
  Orders: OrderHeaderModel[];
  isLoading: boolean;
};
function OrderList({ Orders, isLoading }: props) {
  
  return (
    <>
      {isLoading && <MainLoader></MainLoader>}
      {!isLoading && (
        <div className="container p-5">
          <h1 className="text-success">Orders List</h1>
          <div className=" table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Items</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className=" table-group-divider">
                {Orders.map((order: OrderHeaderModel, index: number) => {
                  const colorStatus = getStatusColor(order.status as SD_Status)
                  return (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.pickupName}</td>
                      <td>{order.pickupPhoneNumber}</td>
                      <td>{order.orderTotal.toFixed(2)}$</td>
                      <td>{order.totalItems}</td>
                      <td>{new Date(order.orderDate!).toLocaleDateString()}</td>
                      <td><span className={`badge bg-${colorStatus}`}>{order.status}</span></td>
                      <td>
                        <Link to={`/Order/OrderDetails/${order.id}`}>
                          <button className="btn btn-success py-1">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderList;
