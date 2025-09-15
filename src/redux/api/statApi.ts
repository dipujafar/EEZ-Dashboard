import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const statApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStat: builder.query({
            query: () => ({
                url: "/overview/total-user-and-earnings",
                method: "GET",
            }),
            providesTags: [tagTypes?.stat],
        }),
    }),
});

export const { useGetStatQuery } = statApi;