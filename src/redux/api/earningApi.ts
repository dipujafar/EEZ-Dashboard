import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const earningApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEarningHistory: builder.query({
            query: (params) => ({
                url: "/overview/earning-history",
                method: "GET",
                params
            }),
            providesTags: [tagTypes.earningHistory],
        })
    })
});

export const { useGetEarningHistoryQuery } = earningApi;