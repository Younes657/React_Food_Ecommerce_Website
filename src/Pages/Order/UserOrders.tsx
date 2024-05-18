import React from "react";
import { useSelector } from "react-redux";
import { withAuth } from "../../HOC";
import { useGetAllOrdersQuery } from "../../Api/OrderApi";
import { RootState } from "../../Storage/Redux/store";
import OrderList from "../../Components/Page/Order/OrderList";
import { MainLoader } from "../../Components/Common";

function UserOrders() {
  const userId = useSelector(
    (state: RootState) => state.authentiacationStore.sub
  );
  const { data, isLoading } = useGetAllOrdersQuery({ userId : userId});

  return (
    <>
        {isLoading && <MainLoader></MainLoader>}
        {!isLoading && (
          <>
          <div className=' d-flex justify-content-between align-items-center mx-5 mt-5'>
          <h1 className="text-success">Orders List</h1>
          </div>
          <OrderList isLoading={isLoading} Orders={data?.apiResponse.result}></OrderList>
          </>
        )}
      </>
  );
}

export default withAuth(UserOrders);
