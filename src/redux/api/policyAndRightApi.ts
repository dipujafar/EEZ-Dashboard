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
  }),
});

export const { useGetPolicyAndRightQuery, useDeletePolicyAndRightMutation } =
  policyAndRightApi;
