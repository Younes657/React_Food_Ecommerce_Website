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

    // addDestination : builder.mutation({
    //   query: (destination) => ({
    //     url: "destination",
    //     method: "POST",
    //     body: destination,
    //   }),
    //   invalidatesTags : ["Destinations"] //so when we are adding a new record the get will also been invoked
    // }),

    // updateDestination : builder.mutation({
    //   query: (destination) => ({
    //     url: `destination/${destination.id}`,
    //     method: "PUT",
    //     body: destination,
    //   }),
    //   invalidatesTags : ["Destinations"]
    // }),

    // deleteDestination : builder.mutation({
    //   query: ({ id }) => ({
    //     url: `destination/${id}`,
    //     method: "DELETE",
    //     body: id,
    //   }),
    //   invalidatesTags : ["Destinations"]
    // })
  }),
});

export const { useGetAllMenuItemsQuery,useGetMenuItemQuery} = MenuItemApi
// query means a get request
