import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const hrAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHrAdmins: builder.query({
      query: (params) => ({
        url: "/hr-admin",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.hrAdmin],
    }),
    crateHrAdmin: builder.mutation({
      query: (data) => ({
        url: "/hr-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.hrAdmin],
    }),
    getSingleHrAdmin: builder.query({
      query: (id) => ({
        url: `/hr-admin/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.hrAdmin],
    }),
    deleteHrAdmin: builder.mutation({
      query: (id) => ({
        url: `/hr-admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.hrAdmin],
    })
  }),
});

export const { useGetAllHrAdminsQuery, useCrateHrAdminMutation, useGetSingleHrAdminQuery, useDeleteHrAdminMutation } = hrAdminApi;