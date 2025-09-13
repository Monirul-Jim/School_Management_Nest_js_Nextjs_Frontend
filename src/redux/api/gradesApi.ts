import { baseApi } from "./baseApi";
// Type for a single subject mark
interface SubjectMark {
  subjectId: string;
  marks: Record<string, number>; // e.g., { "WR": 54 }
  _id: string;
}

// Type for the updated StudentMark object
interface StudentMark {
  _id: string;
  marks: SubjectMark[];
  __v: number;
}

// API response type for upsertMarks
interface UpsertMarksResponse {
  success: boolean;
  message: string;
  data: StudentMark;
}

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
    upsertMarks: builder.mutation<
      UpsertMarksResponse, // you can type the response if needed
      {
        assignSubjectId: string;
        marksInput: Record<string, Record<string, number>>;
      }
    >({
      query: ({ assignSubjectId, marksInput }) => ({
        url: `/grades/marks/${assignSubjectId}`,
        method: "POST",
        body: marksInput,
      }),
      invalidatesTags: ["Grades"], // ensures UI refresh
    }),
    getMyGrades: builder.query({
      query: (params?: { page?: number; limit?: number; userId?: string }) => ({
        url: "/grades/my-grades",
        method: "GET",
        params, // page, limit, userId
      }),
      providesTags: ["Grades"],
    }),
  }),
});

export const {
  useGetAllGradesQuery,
  useUpsertMarksMutation,
  useGetMyGradesQuery,
} = gradesApi;
