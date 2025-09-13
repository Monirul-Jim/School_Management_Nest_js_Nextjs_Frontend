
import type { Metadata } from "next";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

export const metadata: Metadata = {
  title: "Admin Dashboard | MySchool",
  description: "Manage users, courses, and system settings from the admin dashboard.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute role="Admin">
      <div className="p-6">{children}</div>
    </PrivateRoute>
  );
}
