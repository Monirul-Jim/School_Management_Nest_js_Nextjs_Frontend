// src/app/(dashboardLayout)/dashboard/admin/layout.tsx

import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute role="Admin">
      <div className="p-6">
        {children}
      </div>
    </PrivateRoute>
  );
}
