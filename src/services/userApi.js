import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/api/pers?perPage=20',
        method: 'GET',
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