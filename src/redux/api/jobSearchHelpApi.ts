import { create } from "domain";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const jobSearchHelpApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getJobSearchHelp: build.query({
      query: (params) => ({
        url: "/job-search-help",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.jobSearchHelp],
    }),
    getSingleJobSearchHelp: build.query({
      query: (id) => ({
        url: `/job-search-help/single/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.jobSearchHelp],
    }),
    deleteJobSearchHelp: build.mutation({
      query: (id) => ({
        url: `/job-search-help//${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.jobSearchHelp],
    }),
    createJobSearchHelp: build.mutation({
      query: (data) => ({
        url: "/job-search-help",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.jobSearchHelp],
    }),
    updateJobSearchHelp: build.mutation({
      query: (data) => ({
        url: `/job-search-help/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.jobSearchHelp],
    }),
  }),
});

export const {
  useGetJobSearchHelpQuery,
  useDeleteJobSearchHelpMutation,
  useCreateJobSearchHelpMutation,
  useGetSingleJobSearchHelpQuery,
  useUpdateJobSearchHelpMutation,
} = jobSearchHelpApi;
