import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const guidanceHubSuggestionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGuidanceHubSuggestions: builder.query({
            query: () => ({
                url: `/guidance-hub/suggestions`,
                method: 'GET',
            }),
            providesTags: [tagTypes.guidanceHubSuggestions],
        }),
        createGuidanceHubSuggestion: builder.mutation({
            query: (data) => ({
                url: `/guidance-suggestion`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [tagTypes.guidanceHubSuggestions],
        })
    })
})

export const {
    useGetGuidanceHubSuggestionsQuery,
    useCreateGuidanceHubSuggestionMutation
} = guidanceHubSuggestionsApi;