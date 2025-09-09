'use client';

import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/app/redux/feature/auth/authSlice";
import { useAppSelector } from "@/app/redux/feature/hook";
import { RootState } from "@/app/redux/feature/store";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [isClient, setIsClient] = useState(false);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // mark client-side render
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  // Prevent SSR mismatch
  if (!isClient || !user) return null;

  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 shadow-md">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded hover:bg-gray-100"
      >
        <Menu size={24} />
      </button>

      <span className="font-bold text-gray-700">
        Hello, {user.firstName}
      </span>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
