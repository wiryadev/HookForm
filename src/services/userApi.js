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
      query: (payload) => {
        const formData = new FormData();
        for (const key in payload) {
          formData.append(key, payload[key]);
        }
        return {
          url: '/api/pers',
          method: 'POST',
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
          },
        }
      }
    }),
  })
})

export const { useGetUsersQuery, usePostUserMutation } = userApi