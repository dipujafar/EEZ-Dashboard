import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const hrAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHrAdmins: builder.query({
      query: () => ({
        url: "/hr-admin",
        method: "GET",
      }),
      providesTags: [tagTypes.hrAdmin],
    }),
    crateHrAdmin: builder.mutation({
      query: (data) => ({
        url: "/hr-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.hrAdmin],
    })
  }),
});

export const { useGetAllHrAdminsQuery, useCrateHrAdminMutation } = hrAdminApi;