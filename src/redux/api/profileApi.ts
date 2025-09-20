import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: "/user/get-me",
                method: "GET",
            }),
            providesTags: [tagTypes.profile],
        }), 
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/user",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: [tagTypes.profile],
        })
    }),
});

export const { useGetMyProfileQuery, useUpdateProfileMutation } = profileApi;