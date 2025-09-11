"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader2, Pencil, Trash } from "lucide-react";
import { useGetStudentAllClassesQuery } from "@/redux/api/studentClassApi";
import {
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useGetSubjectsQuery,
  useGetPaginationSubjectsQuery,
} from "@/redux/api/subjectApi";
import { CreateSubjectInput, SubjectType } from "@/types/subject.schema";
import Pagination from "@/Shared/Pagination/Pagination";
type StudentClassType = {
  _id: string;
  name: string;
  grade: number;
  isDeleted: boolean;
  students: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const subjectTypes: SubjectType[] = ["MCQ", "CQ", "PRACTICAL", "WR"];

const SubjectManagement: React.FC = () => {
  const { data: Classes } = useGetStudentAllClassesQuery();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [editingSubject, setEditingSubject] =
    useState<CreateSubjectInput | null>(null);

  const { register, handleSubmit, control, watch, reset } =
    useForm<CreateSubjectInput>({
      defaultValues: {
        name: "",
        studentClass: "",
        totalMark: 100,
        types: [],
        mcqMark: 0,
        cqMark: 0,
        practicalMark: 0,
        WR: 0,
        mergedWith: [],
      },
    });

  const selectedTypes = watch("types");

  const { data: subjectsData, refetch } = useGetPaginationSubjectsQuery({
    page,
    search,
    classId: selectedClass,
  });
  const { data: subjects, isLoading: subjectsLoading } = useGetSubjectsQuery();
  const [createSubject, { isLoading: creating }] = useCreateSubjectMutation();
  const [updateSubject, { isLoading: updating }] = useUpdateSubjectMutation();
  useEffect(() => {
    if (editingSubject) reset(editingSubject);
  }, [editingSubject, reset]);

  const onSubmit = async (data: CreateSubjectInput) => {
    const totalAssignedMarks =
      (data.mcqMark || 0) +
      (data.cqMark || 0) +
      (data.practicalMark || 0) +
      (data.WR || 0);
    if (totalAssignedMarks > data.totalMark) {
      alert("Sum of all marks cannot exceed total marks!");
      return;
    }

    try {
      if (editingSubject) {
        await updateSubject({ id: editingSubject._id!, data }).unwrap();
        setEditingSubject(null);
      } else {
        await createSubject(data).unwrap();
      }
      reset();
      refetch();
      alert("Subject saved successfully!");
    } catch (error: any) {
      alert(error?.data?.message || "Error saving subject");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-2xl shadow space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        {editingSubject ? "Edit Subject" : "Create New Subject"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Subject Name"
            {...register("name", { required: true })}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <Controller
            name="studentClass"
            control={control}
            rules={{ required: "Please select at least one class" }}
            render={({ field, fieldState }) => {
              // Make sure value is always an array
              const valueArray: string[] = Array.isArray(field.value)
                ? field.value.map((v) => (typeof v === "string" ? v : v._id))
                : [];

              return (
                <div className="flex flex-col">
                  <label>Select Class(es)</label>
                  <select
                    multiple
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={valueArray}
                    onChange={(e) => {
                      const selectedOptions = Array.from(
                        e.target.selectedOptions,
                        (opt) => opt.value
                      );
                      field.onChange(selectedOptions);
                    }}
                    onBlur={field.onBlur}
                  >
                    {Classes?.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              );
            }}
          />

          <input
            type="number"
            {...register("totalMark", {
              required: true,
              min: 1,
              setValueAs: (v) => Number(v),
            })}
            placeholder="Total Marks"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Subject Types */}
        <div className="flex flex-wrap gap-4">
          {subjectTypes.map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input type="checkbox" value={type} {...register("types")} />
              {type}
            </label>
          ))}
        </div>

        {/* Conditional Marks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedTypes.includes("MCQ") && (
            <input
              type="number"
              {...register("mcqMark", { setValueAs: (v) => Number(v) })}
              placeholder="MCQ Marks"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          )}
          {selectedTypes.includes("CQ") && (
            <input
              type="number"
              {...register("cqMark", { setValueAs: (v) => Number(v) })}
              placeholder="CQ Marks"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          )}
          {selectedTypes.includes("PRACTICAL") && (
            <input
              type="number"
              {...register("practicalMark", { setValueAs: (v) => Number(v) })}
              placeholder="Practical Marks"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          )}
          {selectedTypes.includes("WR") && (
            <input
              type="number"
              {...register("WR", { setValueAs: (v) => Number(v) })}
              placeholder="Written Marks"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          )}
          <div>
            <label className="block mb-2 font-medium">
              Merge With Subjects
            </label>
            {subjectsLoading ? (
              <p>Loading...</p>
            ) : (
              <Controller
                name="mergedWith"
                control={control}
                render={({ field }) => (
                  <select
                    multiple
                    {...field}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      field.onChange(
                        Array.from(e.target.selectedOptions, (opt) => opt.value)
                      )
                    }
                  >
                    {subjects?.map((sub: any) => {
                      const classNames = Array.isArray(sub.studentClass)
                        ? sub.studentClass
                            .map((cls: StudentClassType) => cls.name)
                            .join(", ")
                        : sub.studentClass &&
                          typeof sub.studentClass === "object"
                        ? sub.studentClass.name
                        : "No Class";

                      return (
                        <option key={sub._id} value={sub._id}>
                          {sub.name} — {classNames}
                        </option>
                      );
                    })}
                  </select>
                )}
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          disabled={creating || updating}
        >
          {creating || updating ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              {editingSubject ? "Updating..." : "Creating..."}
            </>
          ) : editingSubject ? (
            "Update Subject"
          ) : (
            "Create Subject"
          )}
        </button>
      </form>

      {/* Table Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Classes</option>
          {Classes?.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl mt-4">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Types</th>
              <th className="px-4 py-2 text-left">Total Marks</th>
              <th className="px-4 py-2 text-left">MCQ</th>
              <th className="px-4 py-2 text-left">CQ</th>
              <th className="px-4 py-2 text-left">Practical</th>
              <th className="px-4 py-2 text-left">WR</th>
              <th className="px-4 py-2 text-left">Merged With</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {subjectsData?.data?.map((sub: CreateSubjectInput, idx: number) => (
              <tr key={sub._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  {(subjectsData?.page! - 1) * (subjectsData?.limit ?? 10) +
                    idx +
                    1}
                </td>

                <td className="px-4 py-2">{sub.name}</td>
                <td className="px-4 py-2">
                  {Array.isArray(sub.studentClass)
                    ? sub.studentClass.map((cls) => cls.name).join(", ")
                    : sub.studentClass && typeof sub.studentClass === "object"
                    ? sub.studentClass.name
                    : "-"}
                </td>

                <td className="px-4 py-2">{sub.types?.join(", ")}</td>
                <td className="px-4 py-2">{sub.totalMark}</td>
                <td className="px-4 py-2">{sub.mcqMark ? sub.mcqMark : "-"}</td>
                <td className="px-4 py-2">{sub.cqMark ? sub.cqMark : "-"}</td>
                <td className="px-4 py-2">
                  {sub.practicalMark ? sub.practicalMark : "-"}
                </td>
                <td className="px-4 py-2">{sub.WR ? sub.WR : "-"}</td>

                <td className="px-4 py-2">
                  {sub.mergedWith?.length
                    ? sub.mergedWith.map((m: any) => m.name).join(", ")
                    : "-"}
                </td>

                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => setEditingSubject(sub)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-4">
        <Pagination
          currentPage={page}
          totalPages={subjectsData?.totalPages || 1}
          onPageChange={(p) => setPage(p)}
        />
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-between text-sm text-gray-600 gap-2 sm:gap-0">
        <div>
          Page {subjectsData?.page} of {subjectsData?.totalPages}
        </div>
        <div>Total Classes: {subjectsData?.total}</div>
      </div>
    </div>
  );
};

export default SubjectManagement;
