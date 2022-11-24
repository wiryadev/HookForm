import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: '/api/pers',
        method: 'GET',
        params,
      })
    }),
    postUser: builder.mutation({
      query: (payload) => ({
        url: '/api/pers',
        method: 'POST',
        body: payload,
      })
    }),
  })
})

export const { useGetUsersQuery, usePostUserMutation } = userApi