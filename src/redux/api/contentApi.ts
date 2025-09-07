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
    }),
});

export const { useGetTermsQuery } = contentApi;