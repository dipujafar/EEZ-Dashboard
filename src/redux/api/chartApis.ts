import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const chartApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserChart: builder.query({
      query: (data) => ({
        url: "/overview/get-user-chart",
        method: "GET",
        params: data,
      }),
      providesTags: [tagTypes.users],
    }),
    getEarningsChart: builder.query({
      query: (data) => ({
        url: "/overview/get-earning-chart",
        method: "GET",
        params: data,
      }),
      providesTags: [tagTypes.earing],
    }),
  }),
});

export const { useGetUserChartQuery, useGetEarningsChartQuery } = chartApis;
