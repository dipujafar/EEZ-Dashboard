import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query({
      query: (params) => ({
        url: "/notification",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.notification],
    }),
    markedRed: build.mutation({
      query: () => ({
        url: `/notification/mark-all-read`,
        method: "PUT",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    deleteNotification: build.mutation({
      query: (id) => ({
        url: `/notification/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkedRedMutation,
  useDeleteNotificationMutation,
} = notificationApi;
