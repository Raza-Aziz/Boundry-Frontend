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

    getUserListings: builder.query({
      query: (params) => ({
        url: `/listings/my-listings`,
        method: "GET",
        params,
      }),
      providesTags: ["Listings"],
    }),

    updateAcquiredStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/listings/${id}/acquired-status`,
        method: "PATCH",
        body: { acquiredStatus: status },
      }),
      invalidatesTags: ["Listings"],
    }),

    createListing: builder.mutation({
      query: (propertyDetails) => ({
        url: `/listings`,
        method: "POST",
        body: propertyDetails,
      }),
      invalidatesTags: ["Listings"],
    }),

    updateListing: builder.mutation({
      query: ({ id, newDetails }) => ({
        url: `/listings/${id}`,
        method: "PATCH",
        body: newDetails,
      }),
      invalidatesTags: ["Listings"],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetListingQuery,
  useGetSimilarListingsQuery,
  useGetUserListingsQuery,
  useUpdateAcquiredStatusMutation,
  useCreateListingMutation,
  useUpdateListingMutation,
} = listingsApi;
