"use client";

import React, { useState } from "react";
import { Loader2, Edit2, Trash2 } from "lucide-react";
import Pagination from "@/Shared/Pagination/Pagination";
import {
  useGetStudentClassesQuery,
  useCreateStudentClassMutation,
  useUpdateStudentClassMutation,
  useDeleteStudentClassMutation,
} from "@/redux/api/studentClassApi";
import { useDebounce } from "@/hooks/useDebounce";
import { StudentClass } from "@/types/student.schema";

export default function ClassesTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    data,
    isLoading: isFetching,
    isError,
  } = useGetStudentClassesQuery({
    page: currentPage,
    search: debouncedSearch,
  });

  const [createClass, { isLoading: isCreating }] =
    useCreateStudentClassMutation();
  const [updateClass, { isLoading: isUpdating }] =
    useUpdateStudentClassMutation();
  const [deleteClass, { isLoading: isDeleting }] =
    useDeleteStudentClassMutation();

  const [newClassName, setNewClassName] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<number | "">("");

  const handleCreate = async () => {
    if (!newClassName.trim() || selectedGrade === "") return;

    await createClass({
      name: newClassName,
      grade: selectedGrade, // ✅ now allowed
    });

    setNewClassName("");
    setSelectedGrade("");
  };

  const handleUpdate = async (id: string) => {
    if (!editingName.trim() || selectedGrade === "") return;

    await updateClass({
      id,
      name: editingName,
      grade: selectedGrade, // ✅ include the grade
    });

    setEditingId(null);
    setEditingName("");
    setSelectedGrade("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    await deleteClass(id);
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin mr-2" /> Loading classes...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center">Failed to load classes.</div>
    );
  }

  return (
    <div className="p-4">
      {/* Create & Search */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search classes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 text-sm flex-1"
        />
        <input
          type="text"
          placeholder="New class name"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          className="border rounded px-2 py-1 text-sm flex-1"
        />
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="">Select Grade</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
            <option key={grade} value={grade}>
              Grade {grade}
            </option>
          ))}
        </select>
        <button
          onClick={handleCreate}
          disabled={isCreating || !newClassName.trim() || selectedGrade === ""}
          className={`px-4 py-1 rounded text-white ${
            isCreating ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isCreating ? (
            <Loader2 className="animate-spin mr-1 inline-block" size={16} />
          ) : (
            "Add"
          )}
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Class Name</th>
              <th className="px-4 py-2 text-left">Grade</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created</th>
              <th className="px-4 py-2 text-left">Updated</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data?.data.map((cls: StudentClass, index: number) => (
              <tr
                key={cls._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-2">
                  {(data.page - 1) * data.limit + index + 1}
                </td>
                <td className="px-4 py-2">
                  {editingId === cls._id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    cls.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === cls._id ? (
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(Number(e.target.value))}
                      className="border rounded px-2 py-1 text-sm w-full"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (grade) => (
                          <option key={grade} value={grade}>
                            Grade {grade}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    `Grade ${cls.grade}` // show current grade when not editing
                  )}
                </td>

                <td className="px-4 py-2">
                  {cls.isDeleted ? "Deleted" : "Active"}
                </td>
                <td className="px-4 py-2">
                  {new Date(cls.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(cls.updatedAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {editingId === cls._id ? (
                    <button
                      onClick={() => handleUpdate(cls._id)}
                      disabled={isUpdating}
                      className={`text-green-500 hover:underline ${
                        isUpdating ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isUpdating ? (
                        <Loader2
                          className="animate-spin inline-block"
                          size={14}
                        />
                      ) : (
                        "Save"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(cls._id);
                        setEditingName(cls.name);
                      }}
                      className="text-blue-500 hover:underline flex items-center gap-1"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                  )}
                  {!cls.isDeleted && (
                    <button
                      onClick={() => handleDelete(cls._id)}
                      disabled={isDeleting}
                      className={`text-red-500 hover:underline flex items-center gap-1 ${
                        isDeleting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isDeleting ? (
                        <Loader2
                          className="animate-spin inline-block"
                          size={14}
                        />
                      ) : (
                        <>
                          <Trash2 size={16} /> Delete
                        </>
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {data?.data.map((cls: StudentClass, index: number) => (
          <div
            key={cls._id}
            className="bg-white shadow rounded-xl p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-700">{cls.name}</div>
              <div className="text-gray-500 text-sm">
                {(data.page - 1) * data.limit + index + 1}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Status: {cls.isDeleted ? "Deleted" : "Active"}
            </div>
            {editingId === cls._id && (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            )}
            <div className="text-xs text-gray-500 space-y-1">
              <div>
                <span className="font-semibold">Created:</span>{" "}
                {new Date(cls.createdAt).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Updated:</span>{" "}
                {new Date(cls.updatedAt).toLocaleString()}
              </div>
            </div>
            <div className="flex gap-2">
              {editingId === cls._id ? (
                <button
                  onClick={() => handleUpdate(cls._id)}
                  className="text-green-500 hover:underline"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(cls._id);
                    setEditingName(cls.name);
                  }}
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  <Edit2 size={16} /> Edit
                </button>
              )}
              {!cls.isDeleted && (
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="text-red-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {data && (
        <Pagination
          currentPage={data.page}
          totalPages={data.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          pageSiblings={2}
        />
      )}

      <div className="mt-4 flex flex-col sm:flex-row justify-between text-sm text-gray-600 gap-2 sm:gap-0">
        <div>
          Page {data?.page} of {data?.totalPages}
        </div>
        <div>Total Classes: {data?.total}</div>
      </div>
    </div>
  );
}
