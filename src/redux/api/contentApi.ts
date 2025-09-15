import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTerms: builder.query({
      query: () => ({
        url: "/pat/terms",
        method: "GET",
      }),
      providesTags: [tagTypes.content],
    }),
    updateTerms: builder.mutation({
      query: (data) => ({
        url: "/pat/create-terms",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.content],
    }),
    getPrivacy: builder.query({
      query: () => ({
        url: "/pat/privacy",
        method: "GET",
      }),
      providesTags: [tagTypes.content],
    }),
    updatePrivacy: builder.mutation({
      query: (data) => ({
        url: "/pat/create-privacy",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.content],
    }),
  }),
});

export const { useGetTermsQuery, useUpdateTermsMutation, useGetPrivacyQuery, useUpdatePrivacyMutation } =
  contentApi;
