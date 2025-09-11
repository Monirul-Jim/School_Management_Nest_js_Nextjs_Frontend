// src/redux/api/subjectApi.ts
import { CreateSubjectInput } from "@/types/subject.schema";
import { baseApi } from "./baseApi";

interface GetSubjectsResponse {
  data: CreateSubjectInput[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create subject
    createSubject: build.mutation<CreateSubjectInput, CreateSubjectInput>({
      query: (newSubject) => ({
        url: "/subjects",
        method: "POST",
        body: newSubject,
      }),
      invalidatesTags: ["Subject"], // ✅ invalidate cache so paginated list refetches
    }),

    // Get all subjects
    getSubjects: build.query<CreateSubjectInput[], void>({
      query: () => "/subjects",
      providesTags: ["Subject"],
    }),

    // Get subjects with pagination, search, filter
    getPaginationSubjects: build.query<
      GetSubjectsResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        classId?: string;
        sortField?: string;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: ({
        page = 1,
        limit = 10,
        search,
        classId,
        sortField,
        sortOrder,
      }) => {
        const params = new URLSearchParams(
          Object.entries({ page, limit, search, classId, sortField, sortOrder })
            .filter(([, value]) => value !== undefined && value !== "")
            .map(([key, value]) => [key, String(value)])
        );
        return `/subjects/pagination?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Subject" as const, id: _id })),
              { type: "Subject", id: "LIST" }, // ✅ for general invalidation
            ]
          : [{ type: "Subject", id: "LIST" }],
    }),

    // Get single subject
    getSubjectById: build.query<CreateSubjectInput, string>({
      query: (id) => `/subjects/${id}`,
      providesTags: (result, error, id) => [{ type: "Subject", id }],
    }),

    // Update subject
    updateSubject: build.mutation<CreateSubjectInput, { id: string; data: CreateSubjectInput }>({
      query: ({ id, data }) => ({
        url: `/subjects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Subject", id },
        { type: "Subject", id: "LIST" },
      ],
    }),

    // Delete subject
    deleteSubject: build.mutation<{ _id: string }, string>({
      query: (id) => ({
        url: `/subjects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Subject", id },
        { type: "Subject", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateSubjectMutation,
  useGetSubjectsQuery,
  useGetSubjectByIdQuery,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
  useGetPaginationSubjectsQuery,
} = subjectApi;
