import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",

    prepareHeaders: (headers) => {
      return headers;
    },
  }),

  tagTypes: ["Listing", "User"],

  endpoints: (builder) => ({
    // GET Listings
    getListings: builder.query({
      query: (params) => ({
        url: "/listings",
        params,
      }),
      providesTags: ["Listing"],
    }),

    createListing: builder.mutation({
      query: (newListingData) => ({
        url: "/listings",
        method: "POST",
        body: newListingData,
      }),
      invalidatesTags: ["Listing"],
    }),

    getUser: builder.query({
      query: () => "/users/profile",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useCreateListingMutation,
  useGetUserQuery,
} = baseApi;
