import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const communicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunication: builder.query({
      query: (params) => ({
        url: "/communication-toolkit-category",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.communication],
    }),
    getSingleCommunication: builder.query({
      query: (id) => ({
        url: `/communication-toolkit-category/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.communication],
    }),
    deleteCommunication: builder.mutation({
      query: (id) => ({
        url: `/communication-toolkit-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.communication],
    }),
    createCommunication: builder.mutation({
      query: (data) => ({
        url: "/communication-toolkit-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.communication],
    }),
    updateCommunication: builder.mutation({
      query: (data) => ({
        url: `/communication-toolkit-category/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.communication],
    }),
  }),
});

export const {
  useGetCommunicationQuery,
  useDeleteCommunicationMutation,
  useCreateCommunicationMutation,
  useGetSingleCommunicationQuery,
  useUpdateCommunicationMutation,
} = communicationApi;
