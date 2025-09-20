import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const communicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommunication: builder.query({
            query: () => ({
                url: "/communication-toolkit-category",
                method: "GET",
            }),
            providesTags: [tagTypes.communication],
        }),
        deleteCommunication: builder.mutation({
            query: (id) => ({
                url: `/communication-toolkit/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.communication],
        })
    }),
});

export const { useGetCommunicationQuery, useDeleteCommunicationMutation } = communicationApi;