import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderHeaderModel } from "../Interfaces";

const OrderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7034/api/",
  }),
  tagTypes:["orders"],
  endpoints: (builder) => ({
    CreateOrder: builder.mutation({
      query: (order) => ({
        url: "Order",
        method: "POST",
        headers: {
           "content-type": "application/json"
        },
        body:order,
      }),
      invalidatesTags:["orders"]
    }),
    getAllOrders:  builder.query({
      query: (userId) =>({
        url: `Order/${userId}`,
        method: "GET",
        params: {}
      }),
      providesTags:["orders"]
    }),
    getSpecifiqueOrder:  builder.query({
      query: (orderId) =>({
        url: `Order/${orderId}`,
        method: "GET",
        params: {}
      }),
      providesTags:["orders"]
    })
  }),
});

export const { useCreateOrderMutation , useGetAllOrdersQuery , useGetSpecifiqueOrderQuery } = OrderApi;
export default OrderApi;