import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubscription: builder.query({
            query: () => ({
                url: "/subscription",
                method: "GET",
            }),
            providesTags: [tagTypes.subscription],
        }),
        createSubscription: builder.mutation({
            query: (data) => ({
                url: "/subscription",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [tagTypes.subscription],
        }),
        singleSubscription: builder.query({
            query: (id) => ({
                url: `/subscription/single/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.subscription],
        }),
        updateSubscription: builder.mutation({
            query: (data) => ({
                url: `/subscription/${data?.id}`,
                method: "PUT",
                body: data?.data,
            }),
            invalidatesTags: [tagTypes.subscription],
        })
    }),
})

export const { useGetSubscriptionQuery, useCreateSubscriptionMutation, useSingleSubscriptionQuery, useUpdateSubscriptionMutation } = subscriptionApi