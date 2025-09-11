"use client";
import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useGetAllMarksQuery, useAssignMarksMutation, StudentMark } from "@/redux/api/gradesApi";

interface MarksFormValues {
  marks: {
    assignSubjectId: string;
    subjectName: string;
    mcqMark?: number;
    cqMark?: number;
    practicalMark?: number;
    WR?: number;
  }[];
}

interface MarksTableProps {
  classId?: string;
}

const StudentMarksTable: React.FC<MarksTableProps> = ({ classId }) => {
  const { data: studentsMarks, isLoading } = useGetAllMarksQuery({ classId });
  const [assignMarks, { isLoading: saving }] = useAssignMarksMutation();

  const { control, handleSubmit } = useForm<MarksFormValues>({
    defaultValues: {
      marks: [],
    },
  });

  // Populate default values when data loads
  React.useEffect(() => {
    if (studentsMarks) {
      const marksData = studentsMarks.flatMap((student) =>
        student.subjectIds.map((sub) => ({
          assignSubjectId: student._id,
          subjectName: sub.name,
          mcqMark: 0,
          cqMark: 0,
          practicalMark: 0,
          WR: 0,
        }))
      );
      control.reset({ marks: marksData });
    }
  }, [studentsMarks, control]);

  const onSubmit = async (data: MarksFormValues) => {
    try {
      for (const mark of data.marks) {
        await assignMarks({
          assignSubjectId: mark.assignSubjectId,
          mcqMark: mark.mcqMark,
          cqMark: mark.cqMark,
          practicalMark: mark.practicalMark,
          WR: mark.WR,
        }).unwrap();
      }
      alert("Marks assigned successfully!");
    } catch (err) {
      alert("Failed to assign marks.");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  // Get unique subjects across all students
  const allSubjects = Array.from(
    new Set(studentsMarks?.flatMap((s) => s.subjectIds.map((sub) => sub.name)) || [])
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Student</th>
              {allSubjects.map((sub) => (
                <th key={sub} className="border px-4 py-2 text-center">{sub}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentsMarks?.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  {student.studentId.firstName} {student.studentId.lastName}
                </td>
                {allSubjects.map((subject) => {
                  // Find corresponding mark object
                  const markIndex = control
                    .getValues("marks")
                    .findIndex(
                      (m) =>
                        m.assignSubjectId === student._id &&
                        m.subjectName === subject
                    );
                  if (markIndex === -1) return <td key={subject}></td>;

                  return (
                    <td key={subject} className="border px-2 py-1 text-center">
                      <Controller
                        name={`marks.${markIndex}.mcqMark`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            min={0}
                            className="w-16 px-1 py-1 border rounded text-center"
                          />
                        )}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Marks"}
      </button>
    </form>
  );
};

export default StudentMarksTable;
