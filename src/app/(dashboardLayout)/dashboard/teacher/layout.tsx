import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";


export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute role="Teacher">
      <div className="p-6">{children}</div>
    </PrivateRoute>
  );
}
