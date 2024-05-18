import React, { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../Api/OrderApi";
import { MainLoader } from "../../Components/Common";
import { OrderList } from "../../Components/Page/Order";
import { SD_Status } from "../../Utility/SD";
import { inputHelper } from "../../Helper";
import { OrderHeaderModel } from "../../Interfaces";

const filterOptions: SD_Status[] = [
  SD_Status.BEING_COOKED,
  SD_Status.CANCELLED,
  SD_Status.COMPLETED,
  SD_Status.CONFIRMED,
  SD_Status.READY_FOR_PICKUP,
];
function AllOrders() {
  const [orderData, setOrderData] = useState<OrderHeaderModel[]>([]);
  const [filters, setFilters] = useState({ searchValue: "", status: "" }); //this for controll components becaue if we did not use apifilters then every time we write something the api will be called
  const [apiFilters, setApiFilters] = useState({ searchValue: "", status: "" });
  const [totalOrders, setTotalOrders] = useState(0);
  const [paginationOptions, setPaginationOptions] = useState({
    pageNb: 1,
    pageSize: 5,
  });
  const [currentPageSize, setCurrentPageSize] = useState(
    paginationOptions.pageSize
  );
  const { data, isLoading } = useGetAllOrdersQuery({
    userId: "",
    ...(apiFilters && {
      searchValue: apiFilters.searchValue,
      Status: apiFilters.status,
      PageNumber: paginationOptions.pageNb,
      Pagesize: paginationOptions.pageSize,
    }),
  });

  const handleInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let tempData = inputHelper(e, filters);
    setFilters(tempData);
  };

  const handleFiltration = () => {
    //filtration without using api
    // const tempData = data.result.filter((order: OrderHeaderModel) => {
    //   if (
    //     (order.pickupName && order.pickupName.includes(filters.searchValue)) ||
    //     (order.PickupEmail &&
    //       order.PickupEmail.includes(filters.searchValue)) ||
    //     (order.pickupPhoneNumber &&
    //       order.pickupPhoneNumber.includes(filters.searchValue))
    //   ) {
    //     return order;
    //   }
    // });
    // const finalFilter = tempData.filter((order: OrderHeaderModel) =>
    //   filters.status !== "" ? order.status === filters.status : order
    // );
    // setOrderData(finalFilter)

    setApiFilters({
      searchValue: filters.searchValue,
      status: filters.status,
    });
  };
  useEffect(() => {
    if (data) {
      setOrderData(data.apiResponse.result);
      console.log(JSON.parse(data.pagination))
      const { TotalCount } = JSON.parse(data.pagination);
      setTotalOrders(TotalCount);
    }
  }, [data]);

  const pageDetails = () => {
    const pageStart =
      (paginationOptions.pageNb - 1) * paginationOptions.pageSize + 1;
    const pageEnd = paginationOptions.pageNb * paginationOptions.pageSize;
    return `${pageStart} - ${
      pageEnd < totalOrders ? pageEnd : totalOrders
    } of ${totalOrders}`;
  };

  const handlePagination = (direction: string, pagesize?: number) => {
    if (direction === "previous")
      setPaginationOptions({
        pageSize: 5,
        pageNb: paginationOptions.pageNb - 1,
      });
    else if (direction === "next")
      setPaginationOptions({
        pageSize: 5,
        pageNb: paginationOptions.pageNb + 1,
      });
    else if (direction === "change") {
      setPaginationOptions({
        pageSize: pagesize ? pagesize : paginationOptions.pageSize,
        pageNb: 1,
      });
    }
  };

  return (
    <>
      {isLoading && <MainLoader></MainLoader>}
      {!isLoading && (
        <>
          <div className=" d-flex justify-content-between align-items-center mx-5 mt-5">
            <h1 className="text-success">Orders List</h1>
            <div className="d-flex" style={{ width: "40%" }}>
              <input
                type="text"
                placeholder="search with name , email , phone number ..."
                className="form-control mx-2"
                value={filters.searchValue}
                name="searchValue"
                onChange={handleInputs}
              />
              <select
                name="status"
                value={filters.status}
                id=""
                className=" w-50 form-select mx-2"
                onChange={handleInputs}
              >
                <option value="">All</option>
                {filterOptions.map((value: SD_Status, index: number) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
              <button
                className="btn btn-outline-success"
                onClick={handleFiltration}
              >
                Filter
              </button>
            </div>
          </div>
          <OrderList isLoading={isLoading} Orders={orderData}></OrderList>
          <div className="d-flex justify-content-end mx-5 align-items-center">
            <div>Rows per Page : </div>
            <div>
              <select
                name=""
                id=""
                value={currentPageSize}
                className="form-select mx-2"
                style={{width:"80px"}}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handlePagination("change" , Number(e.target.value));
                  setCurrentPageSize(Number(e.target.value));
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="mx-2">{pageDetails()}</div>

            <button
              disabled={paginationOptions.pageNb === 1}
              className="btn btn-outline-primary px-3 mx-2"
              onClick={() => handlePagination("previous")}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button
              disabled={
                paginationOptions.pageNb * paginationOptions.pageSize >=
                totalOrders
              }
              className="btn btn-outline-primary px-3 mx-2"
              onClick={() => handlePagination("next")}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default AllOrders;
