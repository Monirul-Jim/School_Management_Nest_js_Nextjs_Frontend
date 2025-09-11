"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetSubjectsQuery } from "@/redux/api/subjectApi";
import {
  useAssignSubjectsMutation,
  useGetAllAssignSubjectsQuery,
} from "@/redux/api/assignApi";
import { AssignSubjectDto } from "@/types/assignSubject.schema";
import Pagination from "@/Shared/Pagination/Pagination";
import { useGetAllStudentsQuery } from "@/redux/api/studentApi";
import { useGetStudentAllClassesQuery } from "@/redux/api/studentClassApi";
import { StudentClass } from "@/types/create-student.schema";
import { Loader2 } from "lucide-react";

const AssignSubject: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [assignedPage, setAssignedPage] = useState<number>(1);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>("");

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
  const {
    data: assignedSubjects,
    isLoading: assignedLoading,
    refetch,
  } = useGetAllAssignSubjectsQuery(
    {
      page: assignedPage,
      limit,
      classId: selectedClassFilter || undefined,
    },
    { refetchOnMountOrArgChange: true }
  );

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
    <div className=" mx-auto p-6 bg-white rounded-xl shadow space-y-6">
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
                <label htmlFor="">Select Student</label>
                <select
                  {...field}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={studentsLoading}
                >
                  <option value="">Select Student</option>
                  {studentsData?.data?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.firstName} {s.lastName} - Class
                      {typeof s.class === "string" ? "" : s.class?.name}
                    </option>
                  ))}
                </select>
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Class Select */}
          <div className="flex flex-col">
            <Controller
              name="classId"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <label htmlFor="">Filter By Class</label>
                  <select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // update form
                      setSelectedClass(e.target.value); // update state for query
                    }}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select a Class</option>
                    {classes.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
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
              className="w-full h-64 px-4 py-2 border rounded-lg"
              onChange={(e) =>
                field.onChange(
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
            >
              {subjects?.map((sub) => {
                // Determine class name(s)
                let classNames = "-";

                if (Array.isArray(sub.studentClass)) {
                  classNames = sub.studentClass
                    .map((cls) => cls.name)
                    .join(", ");
                } else if (
                  typeof sub.studentClass === "object" &&
                  sub.studentClass?.name
                ) {
                  classNames = sub.studentClass.name;
                }

                return (
                  <option key={sub._id} value={sub._id}>
                    {sub.name} — {classNames}
                  </option>
                );
              })}
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          disabled={assigning}
        >
          {assigning ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Assigning...
            </>
          ) : (
            "Assign Subjects"
          )}
        </button>
      </form>

      {/* --- Table of Assigned Subjects --- */}
      <div>
        <div className="flex gap-4 items-center mt-4">
          <label className="font-medium">Filter by Class:</label>
          <select
            value={selectedClassFilter} // <-- bind to filter state
            onChange={(e) => {
              setSelectedClassFilter(e.target.value);
              setAssignedPage(1); // reset table pagination
            }}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        <h3 className="text-lg font-semibold mt-6">Assigned Subjects</h3>
        {assignedLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 mt-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Serial
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Student
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Class
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Subjects
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Main Subject
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Fourth Subjects
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Assigned At
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignedSubjects?.data?.map((a,idx:number) => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      {(assignedSubjects.page - 1) * limit + idx + 1}
                    </td>
                    <td className="border px-4 py-2">
                      {a.studentId.firstName} {a.studentId.lastName}
                    </td>
                    <td className="border px-4 py-2">{a.classId.name}</td>
                    <td className="border px-4 py-2">
                      {a.subjectIds.map((s) => s.name).join(", ")}
                    </td>
                    <td className="border px-4 py-2">
                      {a.mainSubjectId?.name || "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {a.fourthSubjectId?.name || "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination for table */}
        {assignedSubjects && assignedSubjects.total > limit && (
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={assignedSubjects.page}
              totalPages={assignedSubjects.totalPages}
              onPageChange={setAssignedPage}
              pageSiblings={2}
            />
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div>
          Page {assignedSubjects?.page} of {assignedSubjects?.totalPages}
        </div>
        <div>Total Students: {assignedSubjects?.total}</div>
      </div>
    </div>
  );
};

export default AssignSubject;
