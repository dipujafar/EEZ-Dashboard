import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const guidanceHubApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGuidanceHub: builder.query({
      query: (params) => ({
        url: "/g-category",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.guidanceHub],
    }),
    getSingleGuidanceHub: builder.query({
      query: (id) => ({
        url: `/g-category/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.guidanceHub],
    }),
    createGuidanceHub: builder.mutation({
      query: (data) => ({
        url: "/g-category/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.guidanceHub],
    }),
    deleteGuidanceHub: builder.mutation({
      query: (id) => ({
        url: `/g-category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.guidanceHub],
    }),
    updateGuidanceHub: builder.mutation({
      query: (data) => ({
        url: `/g-category/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.guidanceHub],
    })
  }),
});

export const {
  useGetGuidanceHubQuery,
  useCreateGuidanceHubMutation,
  useGetSingleGuidanceHubQuery,
  useDeleteGuidanceHubMutation,
  useUpdateGuidanceHubMutation
} = guidanceHubApi;
