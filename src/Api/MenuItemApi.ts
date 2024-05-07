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
    createMenuItem: builder.mutation({
      query: (menuItem ) =>( {
        url : "MenuItem",
        method : "POST",
        body: menuItem
      }),
      invalidatesTags : ["MenuItems"],
    }),
    updateMenuItem: builder.mutation({
      query: ({data , id} ) =>( {
        url : "MenuItem/"+ id,
        method : "PUT",
        body: data
      }),
      invalidatesTags : ["MenuItems"],
    }),
    deleteMenuItem: builder.mutation({
      query: (menuItemId) =>( {
        url : "MenuItem/" + menuItemId,
        method : "DELETE"
      }),
      invalidatesTags : ["MenuItems"],
    }),
  }),
});

export const { useGetAllMenuItemsQuery,useGetMenuItemQuery , useCreateMenuItemMutation , useUpdateMenuItemMutation , useDeleteMenuItemMutation} = MenuItemApi
// query means a get request
