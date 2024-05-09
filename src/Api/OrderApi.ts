import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const OrderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7034/api/",
    prepareHeaders:(headers : Headers, api) =>{
      const Token = localStorage.getItem("Token");
      Token && headers.append("Authorization","Bearer " + Token)
    }
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
    }),
    updateOrder: builder.mutation({
      query: (order) => ({
        url: "Order/"+ order.id,
        method: "PUT",
        headers: {
           "content-type": "application/json"
        },
        body:order,
      }),
      invalidatesTags:["orders"]
    })
  }),
});

export const { useCreateOrderMutation , useGetAllOrdersQuery , useGetSpecifiqueOrderQuery, useUpdateOrderMutation} = OrderApi;
export default OrderApi;