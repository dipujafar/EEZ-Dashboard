import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/user/users-for-admin",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.users],
    }),
    blockUser: builder.mutation({
      query: (data) => ({
        url: `/user/block-user/${data?.id}?blocked=${data?.status}`,
        method: "PUT",
      }),
      invalidatesTags: [tagTypes.users],
    })
  }),
});

export const { useGetAllUsersQuery, useBlockUserMutation } = usersApi;