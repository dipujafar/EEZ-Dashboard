import { baseApi } from "./baseApi";

const hrAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHrAdmins: builder.query({
      query: () => ({
        url: "/hr-admin",
        method: "GET",
      }),
      providesTags: ["HrAdmins"],
    }),
  }),
});
