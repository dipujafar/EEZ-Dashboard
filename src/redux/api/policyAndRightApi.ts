import { get } from "http";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const policyAndRightApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPolicyAndRight: builder.query({
      query: (params) => ({
        url: "/policy-rights",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.policyAndRight],
    }),
    getSinglePolicyAndRight: builder.query({
      query: (id) => ({
        url: `/policy-rights/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.policyAndRight],
    }),
    deletePolicyAndRight: builder.mutation({
      query: (id) => ({
        url: `/policy-rights/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.policyAndRight],
    }),
    createPolicyAndRight: builder.mutation({
      query: (data) => ({
        url: "/policy-rights",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.policyAndRight],
    }),
    updatePolicyAndRight: builder.mutation({
      query: (data) => ({
        url: `/policy-rights/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.policyAndRight],
    }),
    

  }),
});

export const { useGetPolicyAndRightQuery, useDeletePolicyAndRightMutation, useCreatePolicyAndRightMutation, useUpdatePolicyAndRightMutation, useGetSinglePolicyAndRightQuery } =
  policyAndRightApi;
