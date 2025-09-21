import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const manageContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getManageContent: builder.query({
      query: (params) => ({
        url: "/content-for-adds",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.manageContent],
    }),
    createManageContent: builder.mutation({
      query: (data) => ({
        url: "/content-for-adds",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.manageContent],
    }),
    deleteManageContent: builder.mutation({
      query: (id) => ({
        url: `/content-for-adds/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.manageContent],
    }),
    getSingleManageContent: builder.query({
      query: (id) => ({
        url: `/content-for-adds/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.manageContent],
    }),
    updateManageContent: builder.mutation({
      query: (data) => ({
        url: `/content-for-adds/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.manageContent],
    })
  }),
});

export const { useGetManageContentQuery, useCreateManageContentMutation, useDeleteManageContentMutation, useGetSingleManageContentQuery, useUpdateManageContentMutation } =
  manageContentApi;
