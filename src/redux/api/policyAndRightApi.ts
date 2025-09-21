import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const policyAndRightApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPolicyAndRight: builder.query({
      query: () => ({
        url: "/policy-rights",
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
    })
  }),
});

export const { useGetPolicyAndRightQuery, useDeletePolicyAndRightMutation, useCreatePolicyAndRightMutation } =
  policyAndRightApi;
