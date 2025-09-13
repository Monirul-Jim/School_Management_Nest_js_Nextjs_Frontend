

import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Student Dashboard | MySchool",
  description: "Access your courses, grades, deadlines, and achievements in one place.",
};
export default function StudentDashboard({children}: {children: React.ReactNode}) {
  return (
    <PrivateRoute role="Student">
      <div >{children}</div>
    </PrivateRoute>
  );
}
