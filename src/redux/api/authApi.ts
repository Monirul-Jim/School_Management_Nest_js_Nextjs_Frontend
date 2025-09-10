import { UsersResponse } from "@/types/user.schema";
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
    // getAllUser: builder.query<UsersResponse, { page?: number }>({
    //   query: ({ page = 1 }) => ({
    //     url: `/auth?page=${page}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["user"],
    // }),
    // authApi.ts
    getAllUser: builder.query<
      UsersResponse,
      { page?: number; search?: string; role?: string; status?: string }
    >({
      query: ({ page = 1, search, role, status }) => {
        const queryParams = new URLSearchParams(
          Object.entries({ page, search, role, status })
            .filter(([, value]) => value !== undefined && value !== "")
            .map(([key, value]) => [key, String(value)])
        );

        return {
          url: `/auth?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),


    updateRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/auth/update-role`,
        method: "PATCH",
        body: { userId, role },
      }),
      invalidatesTags: ["user"],
    }),

    updateStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/auth/update-status`,
        method: "PATCH",
        body: { userId, status },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUserQuery,
  useUpdateRoleMutation,
  useUpdateStatusMutation,
} = authApi;
