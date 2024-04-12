import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ShoppingCartApi = createApi({
  reducerPath: "ShoppingCartApi", //just a name //a key used to create a slice
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7034/api/" }),

  tagTypes: ["ShoppingCart"],

  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (userId: string) => ({
        url: `ShoppingCart/${userId}`,
        method: "GET",
      }),
      providesTags: ["ShoppingCart"],
    }),

    upsertShoppingCart: builder.mutation({
      query: ({ UserId, MenuId, UpQuaBy }) => ({
        url: `ShoppingCart`,
        method: "POST",
        params: {
          UserId,
          MenuId,
          UpQuaBy,
        }
      }),
      invalidatesTags: ["ShoppingCart"],
    }),
  }),
});

export const { useGetShoppingCartQuery, useUpsertShoppingCartMutation } = ShoppingCartApi;
// query means a get request
