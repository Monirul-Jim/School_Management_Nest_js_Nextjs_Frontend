"use client";
import React, { useState, useMemo } from "react";
import { useGetStudentAllClassesQuery } from "@/redux/api/studentClassApi";
import { useGetAllGradesQuery, useUpsertMarksMutation } from "@/redux/api/gradesApi";

// Type for each subject mark input
interface MarkInputProps {
  studentId: string;
  subjectId: string;
  type: string;
  initialValue: number | string;
  totalMark: number;
  onBlur: (studentId: string, subjectId: string, type: string, value: string) => void;
}

// ✅ Small component to handle each input's local state with totalMark validation
const MarkInput: React.FC<MarkInputProps> = ({
  studentId,
  subjectId,
  type,
  initialValue,
  totalMark,
  onBlur,
}) => {
  const [value, setValue] = useState<string>(initialValue.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty input
    if (val === "") {
      setValue(val);
      return;
    }

    // Only allow numbers
    const num = Number(val);
    if (isNaN(num)) return;

    // Check against totalMark
    if (num > totalMark) {
      alert(`You cannot give more than ${totalMark}`);
      return;
    }

    setValue(val);
  };

  return (
    <input
      type="text"
      className="rounded w-full px-2 py-1 text-center"
      placeholder={type}
      value={value}
      onChange={handleChange}
      onBlur={() => onBlur(studentId, subjectId, type, value)}
    />
  );
};

// Type for a single subject
interface Subject {
  _id: string;
  name: string;
  totalMark: number;
  types: string[];
}

// Type for a student's marks
interface Mark {
  subjectId: string;
  marks: Record<string, number>;
}

// Type for a single student record
interface Student {
  _id: string;
  studentId: {
    firstName: string;
    lastName: string;
    classRole: number;
  };
  subjectIds: Subject[];
  marks: Mark[];
}
interface StudentClass {
  _id: string;
  name: string;
}
const StudentMarksTable: React.FC = () => {
  const { data: classes = [] } = useGetStudentAllClassesQuery();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const { data: gradesResponse = { data: [] }, isLoading } =
    useGetAllGradesQuery(selectedClass ? { classId: selectedClass } : {}, {
      skip: !selectedClass,
    });

// Wrap grades initialization in useMemo
const grades: Student[] = useMemo(() => gradesResponse.data || [], [gradesResponse.data]);

  const [upsertMarks] = useUpsertMarksMutation();

  // Get unique subjects
  const subjects = useMemo(
    () =>
      Array.from(
        new Set(
          grades.flatMap((student) => student.subjectIds?.map((s) => s.name) || [])
        )
      ),
    [grades]
  );

  // Get mark types per subject across students
  const subjectMarkTypesMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    subjects.forEach((sub) => {
      const types: Set<string> = new Set();
      grades.forEach((student:Student) => {
        const subject = student.subjectIds.find((s) => s.name === sub);
        if (subject) {
          Object.entries(subject).forEach(([key, value]) => {
            if (typeof value === "number" && value !== 0 && key !== "totalMark") {
              types.add(key);
            }
          });
        }
      });
      map[sub] = Array.from(types);
    });
    return map;
  }, [grades, subjects]);

  const handleMarkBlur = async (
    studentId: string,
    subjectId: string,
    type: string,
    value: string
  ) => {
    try {
      await upsertMarks({
        assignSubjectId: studentId,
        marksInput: {
          [subjectId]: { [type]: Number(value) },
        },
      });
    } catch (err) {
      console.error("Failed to update mark:", err);
    }
  };

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
          {classes.map((cls: StudentClass) => (
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
                          <span key={type} className="mx-1">
                            {type.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {grades.map((student:Student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      {student.studentId?.firstName}{" "}
                      {student.studentId?.lastName} <br />
                      <span>Class Roll : {student?.studentId?.classRole}</span>
                    </td>
                    {subjects.map((sub) => {
                      const subject = student.subjectIds.find((s) => s.name === sub);
                      if (!subject)
                        return <td key={sub} className="border px-4 py-2"></td>;

                      return (
                        <td key={sub} className="border px-4 py-2 text-center">
                          <div className="flex flex-col gap-1 w-full">
                            {subjectMarkTypesMap[sub].map((type) => {
                              if (!type) return null;

                              const totalMark = subject.totalMark;

                              // Current mark
                              const currentMark =
                                student.marks?.find((m) => m.subjectId === subject._id)
                                  ?.marks?.[type] ?? "";

                              return (
                                <MarkInput
                                  key={type}
                                  studentId={student._id}
                                  subjectId={subject._id}
                                  type={type}
                                  totalMark={totalMark}
                                  initialValue={currentMark}
                                  onBlur={handleMarkBlur}
                                />
                              );
                            })}
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
