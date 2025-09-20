import { create } from "domain";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const workplaceTagsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkplaceTags: build.query({
      query: (params) => ({
        url: "/workplace-tags",
        method: "GET",
        params
      }),
      providesTags: [tagTypes.workplaceTags],
    }),
    createWorkplaceTags: build.mutation({
      query: (data) => ({
        url: "/workplace-tags",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.workplaceTags],
    }),
    deleteWorkplaceTags: build.mutation({
      query: (id) => ({
        url: `/workplace-tags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.workplaceTags],
    })
  }),
});

export const { useGetWorkplaceTagsQuery, useCreateWorkplaceTagsMutation, useDeleteWorkplaceTagsMutation } = workplaceTagsApi;
