/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.user?.user.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 409)
  ) {
    api.dispatch(logOut());
  }
  return result;
};

const baseQueryWithOutAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
});

const baseQueryWithoutReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

export const baseApiWithoutAuth = createApi({
  reducerPath: 'baseApiWithoutAuth',
  baseQuery: baseQueryWithoutReauth,
  endpoints: (builder) => ({}),
});
