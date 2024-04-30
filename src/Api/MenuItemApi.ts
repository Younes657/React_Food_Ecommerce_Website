import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MenuItemApi = createApi({
  reducerPath: "MenuItemApi", //just a name //a key used to create a slice
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7034/api/" }),

  tagTypes:["MenuItems"],

  endpoints: (builder) => ({
    getAllMenuItems: builder.query({
      query: () => ({
        url: "MenuItem",
        method: "GET",
      }),
      providesTags: ["MenuItems"],
    }),
    
    getMenuItem: builder.query({
        query: (id) => ({
          url: `MenuItem/${id}`,
          method: "GET",
        }),
        providesTags: ["MenuItems"],
      }),
  }),
});

export const { useGetAllMenuItemsQuery,useGetMenuItemQuery} = MenuItemApi
// query means a get request
