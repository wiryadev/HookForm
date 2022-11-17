import { baseApi } from "./baseApi";

export const rankApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRanks : builder.query({
      query: () => ({
        url: '/api/ranks',
        method: 'GET',
      })
    }),
  })
})

export const { useGetRanksQuery } = rankApi