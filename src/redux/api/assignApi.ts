// src/redux/api/assignApi.ts
import { Student } from "@/types/create-student.schema";
import { baseApi } from "./baseApi";
import { AssignSubjectDto } from "@/types/assignSubject.schema";

interface GetAllAssignSubjectsParams {
  page?: number;
  limit?: number;
  search?: string;
  studentId?: string;
  classId?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

interface AssignSubject {
  _id: string;
  studentId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  classId: {
    _id: string;
    name: string;
  };
  subjectIds: {
    _id: string;
    name: string;
  }[];
  mainSubjectId?: {
    _id: string;
    name: string;
  };
  fourthSubjectId?: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}



interface PaginatedAssignSubjects {
  data: AssignSubject[];
  total: number;
  page: number;
  limit: number;
  totalPages:number;
}


export const assignApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    assignSubjects: build.mutation<Student, AssignSubjectDto>({
      query: (data) => ({
        url: "/assign",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),

    getStudentSubjects: build.query<Student, string>({
      query: (studentId) => `/assign/${studentId}`,
      providesTags: ["Student"],
    }),

    // 🔥 New: get all assigned subjects (with pagination, filters, etc.)
    getAllAssignSubjects: build.query<
      PaginatedAssignSubjects,
      GetAllAssignSubjectsParams
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params.page) searchParams.append("page", params.page.toString());
        if (params.limit) searchParams.append("limit", params.limit.toString());
        if (params.search) searchParams.append("search", params.search);
        if (params.studentId)
          searchParams.append("studentId", params.studentId);
        if (params.classId) searchParams.append("classId", params.classId);
        if (params.sortField)
          searchParams.append("sortField", params.sortField);
        if (params.sortOrder)
          searchParams.append("sortOrder", params.sortOrder);

        return {
          url: `/assign/pagination?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Student"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAssignSubjectsMutation,
  useGetStudentSubjectsQuery,
  useGetAllAssignSubjectsQuery,
} = assignApi;
