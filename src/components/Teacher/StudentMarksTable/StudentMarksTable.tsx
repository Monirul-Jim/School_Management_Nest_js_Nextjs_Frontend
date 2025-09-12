"use client";
import React, { useState, useMemo } from "react";
import { useGetStudentAllClassesQuery } from "@/redux/api/studentClassApi";
import { useGetAllGradesQuery, useUpsertMarksMutation } from "@/redux/api/gradesApi";

const StudentMarksTable = () => {
  const { data: classes = [] } = useGetStudentAllClassesQuery();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const { data: gradesResponse = { data: [] }, isLoading } =
    useGetAllGradesQuery(selectedClass ? { classId: selectedClass } : {}, {
      skip: !selectedClass,
    });

  const grades = gradesResponse.data || [];
const [upsertMarks] = useUpsertMarksMutation();
  // Get unique subjects
  const subjects = useMemo(
    () =>
      Array.from(
        new Set(
          grades.flatMap(
            (student: any) => student.subjectIds?.map((s: any) => s.name) || []
          )
        )
      ),
    [grades]
  );

  // Get mark types per subject across students, excluding 0
  // Get actual mark types per subject across students, excluding 0 and 'total'
  const subjectMarkTypesMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    subjects.forEach((sub) => {
      const types: Set<string> = new Set();
      grades.forEach((student: any) => {
        const subject = student.subjectIds.find((s: any) => s.name === sub);
        if (subject) {
          Object.entries(subject).forEach(([key, value]) => {
            if (
              typeof value === "number" &&
              value !== 0 &&
              key !== "totalMark"
            ) {
              types.add(key);
            }
          });
        }
      });
      map[sub] = Array.from(types);
    });
    return map;
  }, [grades, subjects]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Class:</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedClass || ""}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">-- Select --</option>
          {classes.map((cls: any) => (
            <option key={cls._id} value={cls._id}>
              {cls?.name}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <div className="overflow-x-auto">
          {isLoading ? (
            <p>Loading grades...</p>
          ) : grades.length === 0 ? (
            <p>No students or grades found for this class.</p>
          ) : (
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Student Name</th>
                  {subjects.map((sub) => (
                    <th key={sub} className="border px-4 py-2 text-center">
                      {sub}
                      <div className="flex justify-around text-sm mt-1">
                        {subjectMarkTypesMap[sub].map((type) => (
                          <span key={type}>{type}</span>
                        ))}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {grades.map((student: any) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      {student.studentId?.firstName}{" "}
                      {student.studentId?.lastName} <br />
                      <span>Class Roll : {student?.studentId?.classRole}</span>
                    </td>
                    {subjects.map((sub) => {
                      const subject = student.subjectIds.find(
                        (s: any) => s.name === sub
                      );
                      if (!subject)
                        return <td key={sub} className="border px-4 py-2"></td>;

                      return (
                        <td key={sub} className="border px-4 py-2 text-center">
                          <div className="flex flex-col gap-1 w-full">
                            {subjectMarkTypesMap[sub].map((type) =>
                              type ? (
                                <input
                                  key={type}
                                  type="text"
                                  className=" rounded w-full px-2 py-1 text-center"
                                  placeholder={type}
                                />
                              ) : null
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentMarksTable;
