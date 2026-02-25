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
      providesTags: ["Listings"],
    }),

    getListing: builder.query({
      query: (id) => ({
        url: `/listings/${id}`, // Clean URL
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Listings", id }],
    }),

    getSimilarListings: builder.query({
      query: ({ city, status }) => ({
        url: `/listings?city=${city}&status=${status}&limit=3&sort=-createdAt`,
      }),
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetListingQuery,
  useGetSimilarListingsQuery,
} = listingsApi;
