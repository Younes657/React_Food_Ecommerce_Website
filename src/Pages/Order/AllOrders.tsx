import React from 'react'
import { useGetAllOrdersQuery } from '../../Api/OrderApi';
import { MainLoader } from '../../Components/Common';
import { OrderList } from '../../Components/Page/Order';

function AllOrders() {
    const { data, isLoading } = useGetAllOrdersQuery("");

    return (
      <>
        {isLoading && <MainLoader></MainLoader>}
        {!isLoading && (
          <OrderList isLoading={isLoading} Orders={data.result}></OrderList>
        )}
      </>
    );
}

export default AllOrders