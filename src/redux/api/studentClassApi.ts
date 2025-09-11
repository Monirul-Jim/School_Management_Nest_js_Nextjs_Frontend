// src/redux/api/studentClassApi.ts
import { baseApi } from "./baseApi";

export interface StudentClassResponse {
  _id: string;
  name: string;
  grade:number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetStudentClassesResponse {
  data: StudentClassResponse[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export const studentClassApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all classes with pagination, search, sort
    getStudentClasses: builder.query<
      GetStudentClassesResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        sortField?: string;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: ({ page = 1, limit = 10, search, sortField, sortOrder }) => {
        const queryParams = new URLSearchParams(
          Object.entries({ page, limit, search, sortField, sortOrder })
            .filter(([, value]) => value !== undefined && value !== "")
            .map(([key, value]) => [key, String(value)])
        );
        return {
          url: `/class?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["StudentClass"],
    }),
    getStudentAllClasses: builder.query<StudentClassResponse[], void>({
      query: () => "/class/all-classes",
      providesTags: ["StudentClass"],
    }),

    // Get single class by ID
    getStudentClassById: builder.query<StudentClassResponse, string>({
      query: (id) => `/class/${id}`,
      providesTags: ["StudentClass"],
    }),

    // Create class
    createStudentClass: builder.mutation<
      StudentClassResponse,
      { name: string ,grade:number}
    >({
      query: (body) => ({
        url: "/class",
        method: "POST",
        body,
      }),
      invalidatesTags: ["StudentClass"],
    }),

    updateStudentClass: builder.mutation<
      StudentClassResponse,
      { id: string; name: string,grade:number }
    >({
      query: ({ id, ...body }) => ({
        url: `/class/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["StudentClass"],
    }),

    // Soft delete class
    deleteStudentClass: builder.mutation<StudentClassResponse, string>({
      query: (id) => ({
        url: `/class/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StudentClass"],
    }),
  }),
});

export const {
  useGetStudentClassesQuery,
  useGetStudentClassByIdQuery,
  useCreateStudentClassMutation,
  useUpdateStudentClassMutation,
  useDeleteStudentClassMutation,
  useGetStudentAllClassesQuery,
} = studentClassApi;
