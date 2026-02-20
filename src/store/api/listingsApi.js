import { baseApi } from "./baseApi";

export const listingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query({
      query: (params) => ({
        url: "/listings",
        method: "GET",
        // RTK Query auto handles URL params
        params,
      }),
      invalidatesTags: ["Listings"],
      keepUnusedDataFor: 120,
    }),
  }),
});

export const { useGetListingsQuery } = listingsApi;
