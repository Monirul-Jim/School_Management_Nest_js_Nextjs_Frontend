
import type { Metadata } from "next";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

export const metadata: Metadata = {
  title: "Teacher Dashboard | MySchool",
  description: "Manage classes, assignments, and student performance in the teacher dashboard.",
};

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute role="Teacher">
      <div className="p-6">{children}</div>
    </PrivateRoute>
  );
}
