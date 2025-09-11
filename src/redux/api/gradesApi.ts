import { baseApi } from './baseApi';

export interface AssignMarksDto {
  assignSubjectId: string; 
  mcqMark?: number;
  cqMark?: number;
  practicalMark?: number;
  WR?: number;
}

export interface StudentMark {
  _id: string;
  assignSubjectId: string; 
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
  mcqMark?: number;
  cqMark?: number;
  practicalMark?: number;
  WR?: number;
  totalMark?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllMarksParams {
  classId?: string;
  studentId?: string;
}


export const gradesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    assignMarks: builder.mutation<StudentMark, AssignMarksDto>({
      query: (dto) => ({
        url: '/grades/marks',
        method: 'PATCH',
        body: dto,
      }),
      invalidatesTags: ['Grades'],
    }),

    getMarks: builder.query<StudentMark, string>({
      query: (assignSubjectId) => `/grades/${assignSubjectId}`,
      providesTags: ['Grades'],
    }),

    getAllMarks: builder.query<StudentMark[], GetAllMarksParams>({
      query: ({ classId, studentId }) => {
        const params = new URLSearchParams();
        if (classId) params.append('classId', classId);
        if (studentId) params.append('studentId', studentId);
        return `/grades/all?${params.toString()}`;
      },
      providesTags: ['Grades'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAssignMarksMutation,
  useGetMarksQuery,
  useGetAllMarksQuery,
} = gradesApi;
