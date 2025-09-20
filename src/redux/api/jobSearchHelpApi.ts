import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const jobSearchHelpApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getJobSearchHelp: build.query({
            query: () => ({
                url: "/job-search-help",
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
        })
    }),
});

export const { useGetJobSearchHelpQuery, useDeleteJobSearchHelpMutation } = jobSearchHelpApi;