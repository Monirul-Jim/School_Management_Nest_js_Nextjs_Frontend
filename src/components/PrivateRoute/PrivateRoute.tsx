"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/feature/store";
import { useAppSelector } from "@/redux/feature/hook";

type UserRole = "Admin" | "Student" | "Teacher";

export default function PrivateRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role: UserRole;
}) {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Prevent SSR mismatch
    return null;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  if (user.role !== role) {
    router.push("/dashboard");
    return null;
  }

  return <>{children}</>;
}
