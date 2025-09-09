import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
      providesTags: ["user"], // Provides the "user" tag for cache management
    }),

    updateIsDeleted: builder.mutation({
      query: ({ userId, isDeleted }) => ({
        url: `/auth/${userId}/isDeleted`,
        method: "PATCH",
        body: { isDeleted },
      }),
      invalidatesTags: ["user"], // Ensures the cache for the "user" tag is invalidated
    }),

    updateRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/auth/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["user"], // Invalidates the user cache
    }),

    updateStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/auth/${userId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["user"], // Invalidates the user cache
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUserQuery,
  useUpdateIsDeletedMutation,
  useUpdateRoleMutation,
  useUpdateStatusMutation,
} = authApi;