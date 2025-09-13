"use client";

import React from "react";
import { useGetMyGradesQuery } from "@/redux/api/gradesApi";
import { useAppSelector } from "@/redux/feature/hook";
import { RootState } from "@/redux/feature/store";

// Types
type Subject = { _id: string; name: string; types: string[] };
type Mark = { _id: string; subjectId: string; marks: Record<string, number> };
type ClassType = { _id: string; name: string };
type Student = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  bloodGroup?: string;
  dateOfBirth?: string;
};
type Assignment = { _id: string; studentId: Student; classId: ClassType; subjectIds: Subject[]; marks: Mark[] };

const Results = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const { data, isLoading, isError } = useGetMyGradesQuery({
    page: 1,
    limit: 10,
    userId: user?._id,
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-48">
      <p className="text-gray-500 text-lg">Loading results...</p>
    </div>
  );

  if (isError) return (
    <div className="flex justify-center items-center h-48">
      <p className="text-red-500 text-lg font-medium">Failed to load results. Please try again.</p>
    </div>
  );

  const assignments: Assignment[] = data?.data ?? [];
  if (assignments.length === 0) return (
    <div className="flex justify-center items-center h-48">
      <p className="text-gray-500 text-lg">No results found for your account.</p>
    </div>
  );

  // Assuming all assignments belong to the same student
  const student = assignments[0].studentId;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Student Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Student Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
          <div><span className="font-semibold">Name:</span> {student.firstName} {student.lastName}</div>
          <div><span className="font-semibold">Email:</span> {student.email}</div>
          <div><span className="font-semibold">Gender:</span> {student.gender}</div>
          {student.bloodGroup && <div><span className="font-semibold">Blood Group:</span> {student.bloodGroup}</div>}
          {student.dateOfBirth && <div><span className="font-semibold">DOB:</span> {new Date(student.dateOfBirth).toLocaleDateString()}</div>}
          <div><span className="font-semibold">Class:</span> {assignments[0].classId.name}</div>
        </div>
      </div>

      {/* Grades Table */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Results</h2>
      <div className="space-y-12">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-blue-50 border-b border-blue-100">
              <h3 className="text-xl font-semibold text-gray-700">
                Class: {assignment.classId?.name || "N/A"}
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold uppercase text-gray-600 border-b">Subject</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold uppercase text-gray-600 border-b">Type</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold uppercase text-gray-600 border-b">Marks</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assignment.marks.flatMap((mark) => {
                      const subject = assignment.subjectIds.find(s => s._id === mark.subjectId);
                      return Object.entries(mark.marks).map(([type, value]) => (
                        <tr key={`${mark._id}-${type}`} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="py-3 px-4 text-sm text-gray-900">{subject?.name || "N/A"}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{type}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{value}</td>
                        </tr>
                      ));
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
