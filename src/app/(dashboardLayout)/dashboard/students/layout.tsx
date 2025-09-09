// app/dashboard/student/page.tsx
'use client'

import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

export default function StudentDashboard() {
  return (
    <PrivateRoute role="Student">
      <div className="text-2xl font-bold">Welcome Student Dashboard</div>
    </PrivateRoute>
  );
}
