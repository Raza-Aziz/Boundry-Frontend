import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (updatedUserData) => ({
        url: "/users/profile",
        method: "PATCH",
        body: updatedUserData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUpdateProfileMutation } = userApi;
