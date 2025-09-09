'use client';
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { UsersResponse, User } from "@/types/user.schema";
import Pagination from "@/Shared/Pagination/Pagination";
import {
  useGetAllUserQuery,
  useUpdateRoleMutation,
  useUpdateStatusMutation,
} from "@/redux/api/authApi";

export default function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetAllUserQuery({ page: currentPage }) as {
    data?: UsersResponse;
    isLoading: boolean;
    isError: boolean;
  };

  const [updateRole] = useUpdateRoleMutation();
  const [updateStatus] = useUpdateStatusMutation();

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateRole({ userId, role: newRole }).unwrap();
      alert("Role updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      await updateStatus({ userId, status: newStatus }).unwrap();
      alert("Status updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin mr-2" /> Loading...
      </div>
    );

  if (isError)
    return <div className="text-red-500 text-center">Failed to load users.</div>;

  const roles = ["Admin", "Teacher", "Student", "Guardian", "User"];
  const statuses = ["active", "blocked", "deleted"];

  return (
    <div className="p-2">
      {/* Table for medium+ screens */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Timestamps</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data?.data.map((user: User, index: number) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 py-2">{(data.page - 1) * data.limit + index + 1}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.firstName} {user.lastName}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm w-full"
                  >
                    {roles.map((role) => <option key={role} value={role}>{role}</option>)}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm w-full"
                  >
                    {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <div className="text-xs sm:text-sm">
                    <div><span className="font-semibold">Created:</span> {new Date(user.createdAt).toLocaleString()}</div>
                    <div><span className="font-semibold">Updated:</span> {new Date(user.updatedAt).toLocaleString()}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-4">
        {data?.data.map((user: User, index: number) => (
          <div key={user._id} className="bg-white shadow rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-700">{user.firstName} {user.lastName}</div>
              <div className="text-gray-500 text-sm">#{(data.page - 1) * data.limit + index + 1}</div>
            </div>
            <div className="text-sm text-gray-600">Email: {user.email}</div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div>
                <span className="font-semibold">Role: </span>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm w-full"
                >
                  {roles.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
              <div>
                <span className="font-semibold">Status: </span>
                <select
                  value={user.status}
                  onChange={(e) => handleStatusChange(user._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm w-full"
                >
                  {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <div><span className="font-semibold">Created:</span> {new Date(user.createdAt).toLocaleString()}</div>
              <div><span className="font-semibold">Updated:</span> {new Date(user.updatedAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      {data && (
        <Pagination
          currentPage={data.page}
          totalPages={data.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          pageSiblings={2}
        />
      )}

      <div className="mt-4 flex flex-col sm:flex-row justify-between text-sm text-gray-600 gap-2 sm:gap-0">
        <div>Page {data?.page} of {data?.totalPages}</div>
        <div>Total Users: {data?.total}</div>
      </div>
    </div>
  );
}
