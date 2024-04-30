import React from 'react'
import { OrderHeaderModel } from '../../../Interfaces'
import { MainLoader } from '../../Common';

type props = {
    Orders : OrderHeaderModel[],
    isLoading : boolean,
}
function OrderList({Orders , isLoading} : props) {
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
                  <th></th>
                </tr>
              </thead>
              <tbody className=" table-group-divider">
                {Orders.map((order : OrderHeaderModel , index: number) =>{
                    return (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.pickupName}</td>
                        <td>{order.pickupPhoneNumber}</td>
                        <td>{order.orderTotal.toFixed(2)}$</td>
                        <td>{order.totalItems}</td>
                        <td>{new Date(order.orderDate!).toLocaleDateString( )}</td>
                        <td>
                          <button className="btn btn-success py-1">Details</button>
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
  )
}

export default OrderList