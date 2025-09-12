import StudentMarksTable from "@/components/Teacher/StudentMarksTable/StudentMarksTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Marks | Teacher Dashboard",
  description: "View and manage student marks in the teacher dashboard.",
};

const StudentMark = () => {
  return (
    <div>
      <StudentMarksTable />
    </div>
  );
};

export default StudentMark;
