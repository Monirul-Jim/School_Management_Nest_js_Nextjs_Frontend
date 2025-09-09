"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/feature/hook";
import { RootState } from "@/app/redux/feature/store";
import { useRouter } from "next/navigation";

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
    router.push("/auth");
    return null;
  }

  if (user.role !== role) {
    router.push("/dashboard");
    return null;
  }

  return <>{children}</>;
}
