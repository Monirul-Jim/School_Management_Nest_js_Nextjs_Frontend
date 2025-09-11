"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetSubjectsQuery } from "@/redux/api/subjectApi";
import { useAssignSubjectsMutation } from "@/redux/api/assignApi";
import { AssignSubjectDto } from "@/types/assignSubject.schema";
import Pagination from "@/Shared/Pagination/Pagination";
import { useGetAllStudentsQuery } from "@/redux/api/studentApi";
import { useGetStudentAllClassesQuery } from "@/redux/api/studentClassApi";
import { StudentClass } from "@/types/create-student.schema";

const AssignSubject: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const [selectedClass, setSelectedClass] = useState<string>("");
  const { data: studentsData, isLoading: studentsLoading } =
    useGetAllStudentsQuery({
      page,
      limit,
      classId: selectedClass || undefined,
    });
  const { data: subjects } = useGetSubjectsQuery();
  const [assignSubjects, { isLoading: assigning }] =
    useAssignSubjectsMutation();
  const { data: classes = [] } = useGetStudentAllClassesQuery();
  const { control, handleSubmit, watch, reset } = useForm<AssignSubjectDto>({
    defaultValues: {
      studentId: "",
      classId: "",
      subjectIds: [],
      mainSubjectId: undefined,
      fourthSubjectId: undefined,
    },
  });

  const selectedSubjects = watch("subjectIds") || [];

  const onSubmit = async (data: AssignSubjectDto) => {
    try {
      await assignSubjects(data).unwrap();
      alert("Subjects assigned successfully!");
    } catch (error: any) {
      alert(error?.data?.message || "Failed to assign subjects");
    }
  };

  const handlePageChange = (newPage: number) => {
    reset({
      studentId: "",
      classId: "",
      subjectIds: [],
      mainSubjectId: undefined,
      fourthSubjectId: undefined,
    });
    setPage(newPage);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-xl font-bold">Assign Subjects to Student</h2>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  {/* Student & Class Select in one row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Student Select */}
    <Controller
      name="studentId"
      control={control}
      rules={{ required: "Please select a student" }}
      render={({ field, fieldState }) => (
        <div className="flex flex-col">
          <select
            {...field}
            className="w-full px-4 py-2 border rounded-lg"
            disabled={studentsLoading}
          >
            <option value="">Select Student</option>
            {studentsData?.data?.map((s) => (
              <option key={s._id} value={s._id}>
                {s.firstName} {s.lastName} - Class {s.class?.name || ""}
              </option>
            ))}
          </select>
          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />

    {/* Class Select */}
    <div className="flex flex-col">
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="">All Classes</option>
        {classes.map((cls: StudentClass) => (
          <option key={cls._id} value={cls._id}>
            {cls.name}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Pagination */}
  {studentsData && studentsData.totalPages > 1 && (
    <div className="flex justify-center mt-2">
      <Pagination
        currentPage={studentsData.page}
        totalPages={studentsData.totalPages}
        onPageChange={handlePageChange}
        pageSiblings={2}
      />
    </div>
  )}

  {/* Subject Multi-Select */}
  <Controller
    name="subjectIds"
    control={control}
    render={({ field }) => (
      <select
        {...field}
        multiple
        className="w-full px-4 py-2 border rounded-lg"
        onChange={(e) =>
          field.onChange(
            Array.from(e.target.selectedOptions, (opt) => opt.value)
          )
        }
      >
        {subjects?.map((sub) => (
          <option key={sub._id} value={sub._id}>
            {sub.name} — {sub.studentClass?.name || "No Class"}
          </option>
        ))}
      </select>
    )}
  />

  {/* Main Subject */}
  {selectedSubjects.length > 0 && (
    <Controller
      name="mainSubjectId"
      control={control}
      render={({ field }) => (
        <select {...field} className="w-full px-4 py-2 border rounded-lg">
          <option value="">Select Main Subject (optional)</option>
          {subjects
            ?.filter((sub) => selectedSubjects.includes(sub._id))
            .map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
        </select>
      )}
    />
  )}

  {/* Fourth Subject */}
  {selectedSubjects.length > 0 && (
    <Controller
      name="fourthSubjectId"
      control={control}
      render={({ field }) => (
        <select {...field} className="w-full px-4 py-2 border rounded-lg">
          <option value="">Select Fourth Subject (optional)</option>
          {subjects
            ?.filter((sub) => selectedSubjects.includes(sub._id))
            .map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
        </select>
      )}
    />
  )}

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
    disabled={assigning}
  >
    Assign Subjects
  </button>
</form>

    </div>
  );
};

export default AssignSubject;
