import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mabesal.indi.network',
  }),
  endpoints: () => ({})
})

export const BASE_URL = 'https://mabesal.indi.network/'