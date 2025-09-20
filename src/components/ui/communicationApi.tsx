import { baseApi } from "@/redux/api/baseApi";

const communicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunication: builder.query({
      query: () => ({
        url: "/communication",
        method: "GET",
      }),
      providesTags: ["Communication"],
    }),
  }),
});
