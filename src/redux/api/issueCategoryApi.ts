import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const issueCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getIssueCategory: build.query({
      query: (params) => ({
        url: "/schedule-type",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.issueCategory],
    }),
    getSingleIssueCategory: build.query({
      query: (id) => ({
        url: `/schedule-type/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.issueCategory],
    }),
    deleteIssueCategory: build.mutation({
      query: (id) => ({
        url: `/schedule-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.issueCategory],
    }),
    updateIssueCategory: build.mutation({
      query: (data) => ({
        url: `/schedule-type/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.issueCategory],
    }),
    createIssueCategory: build.mutation({
      query: (data) => ({
        url: "/schedule-type",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.issueCategory],
    }),
  }),
});

export const {
  useGetIssueCategoryQuery,
  useGetSingleIssueCategoryQuery,
  useDeleteIssueCategoryMutation,
  useUpdateIssueCategoryMutation,
  useCreateIssueCategoryMutation,
} = issueCategoryApi;
