import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7034/api/",
    prepareHeaders:(headers : Headers, api) =>{
      const Token = localStorage.getItem("Token");
      Token && headers.append("Authorization","Bearer " + Token)
    }
  }),
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (userId) => ({
        url: "Payment",
        method: "POST",
        params: {
          userId: userId,
        },
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation } = paymentApi;
export default paymentApi;