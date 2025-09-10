// src/redux/api/studentApi.ts
import { PaginatedStudents } from "@/types/create-student.schema";
import { baseApi } from "./baseApi";

export interface Student {
  _id: string;
  firstName?: string;
  lastName?: string;
  fatherName: string;
  motherName: string;
  presentAddress: string;
  permanentAddress: string;
  guardianNumber: string;
  localGuardianName?: string;
  localGuardianNumber?: string;
  bloodGroup?: string;
  gender: "Male" | "Female";
  classRole?: number;
  class: {
    _id: string;
    name: string;
    section?: string;
  };
  dateOfBirth: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}


export interface CreateStudentDto {
  firstName?: string;
  lastName?: string;
  fatherName: string;
  motherName: string;
  presentAddress: string;
  permanentAddress: string;
  guardianNumber: string;
  localGuardianNumber?: string;
  bloodGroup?: string;
  classId: string;
}
export interface PaginatedResponse<T> {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  data: T[];
}

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerStudent: builder.mutation<Student, CreateStudentDto>({
      query: (data) => ({
        url: "/students/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),
    getAllStudents: builder.query<
      PaginatedStudents,
      {
        page?: number;
        limit?: number;
        search?: string;
        classId?: string;
        bloodGroup?: string;
      }
    >({
      query: ({ page = 1, limit = 10, search, classId, bloodGroup }) => {
        const queryParams = new URLSearchParams(
          Object.entries({ page, limit, search, classId, bloodGroup })
            .filter(([, value]) => value !== undefined && value !== "")
             .map(([key, value]) => [key, String(value)])
        );

        return {
          url: `/students?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Student"],
    }),

    getStudentById: builder.query<Student, string>({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      providesTags: ["Student"],
    }),
    updateStudent: builder.mutation<
      Student,
      { id: string; body: Partial<Student> }
    >({
      query: ({ id, body }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useRegisterStudentMutation,
  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} = studentApi;

export default studentApi;
