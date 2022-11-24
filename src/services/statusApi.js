import { baseApi } from "./baseApi";

export const statusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatuses: builder.query({
      query: () => ({
        url: '/api/statuses',
        method: 'GET',
      })
    }),
  })
})

export const { useGetStatusesQuery } = statusApi