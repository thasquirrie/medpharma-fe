import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_AUTH_URL,
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logOut());
  }
  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    registerPatient: builder.mutation({
      query: (body) => ({
        url: '/register/patient',
        method: 'POST',
        body,
      }),
    }),
    registerOfficer: builder.mutation({
      query: (body) => ({
        url: '/register/officer',
        method: 'POST',
        body,
      }),
    }),
    verify: builder.mutation({
      query: (body) => ({
        url: '/verify',
        method: 'POST',
        body,
      }),
    }),
    resendOTP: builder.mutation({
      query: (body) => ({
        url: '/send-otp',
        method: 'POST',
        body,
      }),
    }),
   
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: '/forgot-password',
        method: 'POST',
        body,
      }),
    }),
   
  }),
});

export const {
  useLoginMutation,
  useRegisterPatientMutation,
  useRegisterOfficerMutation,
  useVerifyMutation,
  useResendOTPMutation,
} = authApi;
