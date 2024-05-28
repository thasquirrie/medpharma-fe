import { baseApi } from './api';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({
      query: () => ({
        url: '/user',
      }),
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: '/user/update-password',
        method: 'POST',
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: '/user/update',
        method: 'PATCH',
        body,
      }),
    }),
    createConsultation: builder.mutation({
      query: (body) => ({
        url: '/consultation',
        method: 'POST',
        body,
      }),
    }),

    getAllPatients: builder.query({
      query: () => ({
        url: `/patient/`,
      }),
    }),
    getProviders: builder.query({
      query: () => ({
        url: '/provider',
      }),
    }),
    getConsultation: builder.query({
      query: (params) => ({
        url: `/consultation/${params.id}`,
      }),
    }),
    getAllConsultations: builder.query({
      query: (params) => {
        return { url: `/consultation`, params };
      },
    }),
    getAllConsultationsForAUser: builder.query({
      query: (params) => {
        return { url: `/consultation/user`, params };
      },
    }),
  }),
});

export const {
  useGetLoggedInUserQuery,
  useLazyGetLoggedInUserQuery,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
  useGetAllPatientsQuery,
  useLazyGetAllPatientsQuery,
  useCreateConsultationMutation,
  useLazyGetProvidersQuery,
  useGetProvidersQuery,
  useLazyGetConsultationQuery,
  useLazyGetAllConsultationsQuery,
  useLazyGetAllConsultationsForAUserQuery,
} = dashboardApi;
