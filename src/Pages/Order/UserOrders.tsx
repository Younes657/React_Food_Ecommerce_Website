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
  const { data, isLoading } = useGetAllOrdersQuery(userId);

  return (
    <>
      {isLoading && <MainLoader></MainLoader>}
      {!isLoading && (
        <OrderList isLoading={isLoading} Orders={data.result}></OrderList>
      )}
    </>
  );
}

export default withAuth(UserOrders);
