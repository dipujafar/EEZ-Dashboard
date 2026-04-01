import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const uiSettingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUiSettings: build.query({
      query: (params) => ({
        url: "/ui-settings",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.uiSettings],
    }),
    updateUiSettings: build.mutation({
      query: (data) => ({
        url: "/ui-settings",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.uiSettings],
    }),
  }),
});

export const { useGetUiSettingsQuery, useUpdateUiSettingsMutation } = uiSettingsApi;