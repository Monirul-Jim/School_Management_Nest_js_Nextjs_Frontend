// src/redux/api/assignApi.ts
import { Student } from "@/types/create-student.schema";
import { baseApi } from "./baseApi"; // your baseApi
import { AssignSubjectDto } from "@/types/assignSubject.schema"; // define DTO type

export const assignApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    assignSubjects: build.mutation<Student, AssignSubjectDto>({
      query: (data) => ({
        url: "/assign",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"], // optional: invalidate student cache if you have
    }),

    getStudentSubjects: build.query<Student, string>({
      query: (studentId) => `/assign/${studentId}`,
      providesTags: ["Student"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for components
export const { useAssignSubjectsMutation, useGetStudentSubjectsQuery } = assignApi;
