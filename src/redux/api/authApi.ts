import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
   
    login: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    forgetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    verifyOtp: build.mutation({
      query: (data) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/user/change_password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    })
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation
} = authApi;
