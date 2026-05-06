import { url } from "inspector";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const creditsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCreditData: builder.query({
      query: () => ({
        url: "/credits/packages",
        method: "GET",
      }),
      providesTags: [tagTypes.credits],
    }),
    createCreateData: builder.mutation({
      query: (data) => ({
        url: "/credits/packages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.credits],
    }),
    updateCreateData: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/credits/packages/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.credits],
    }),
    deleteCreateData: builder.mutation({
      query: (id) => ({
        url: `/credits/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.credits],
    }),
  }),
});

export const {
  useGetCreditDataQuery,
  useCreateCreateDataMutation,
  useUpdateCreateDataMutation,
  useDeleteCreateDataMutation,
} = creditsApi;
