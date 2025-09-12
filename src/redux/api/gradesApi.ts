import { baseApi } from "./baseApi";

export const gradesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all grades
    getAllGrades: builder.query({
      query: (params?: {
        classId?: string;
        studentId?: string;
        page?: number;
        limit?: number;
        search?: string;
        sortField?: string;
        sortOrder?: "asc" | "desc";
      }) => ({
        url: "/grades",
        method: "GET",
        params,
      }),
      providesTags: ["Grades"],
    }),

    // Upsert marks for a specific assignment
    upsertMarks: builder.mutation({
      query: ({
        assignSubjectId,
        marksInput,
      }: {
        assignSubjectId: string;
        marksInput: Record<string, Record<string, number>>;
      }) => ({
        url: `/grades/marks/${assignSubjectId}`,
        method: "POST",
        body: marksInput,
      }),
      invalidatesTags: ["Grades"], // refetch grades after update
    }),
  }),
});

export const { useGetAllGradesQuery, useUpsertMarksMutation } = gradesApi;
