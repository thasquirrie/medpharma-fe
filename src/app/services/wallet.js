import { baseApi } from './api';

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
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
    // getAllProjects: builder.query({
    //   query: (params) => ({
    //     url: '/projects',
    //     params,
    //   }),
    // }),
    buyCredits: builder.mutation({
      query: (body) => ({
        url: `/account/${body.id}/buy`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllConsultationsQuery,
  useLazyGetAllConsultationsQuery,
  useGetAllConsultationsForAUserQuery,
  useLazyGetAllConsultationsForAUserQuery,
} = walletApi;
