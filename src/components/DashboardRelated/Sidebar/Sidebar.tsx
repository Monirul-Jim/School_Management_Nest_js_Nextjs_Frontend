'use client';

import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { Users, GraduationCap, BookOpen, FileText, CreditCard, Home, X } from "lucide-react";
import { RootState } from "@/redux/feature/store";
import { useAppSelector } from "@/redux/feature/hook";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !user) return null;

  const menuItems: Record<string, { label: string; href: string; icon: JSX.Element }[]> = {
    Admin: [
      { label: "Dashboard", href: "/dashboard/admin", icon: <Home size={18} /> },
      { label: "User Management", href: "/dashboard/admin/usermanagement", icon: <Users size={18} /> },
      { label: "Classes", href: "/dashboard/admin/classes", icon: <GraduationCap size={18} /> },
    ],
    Teacher: [
      { label: "Dashboard", href: "/dashboard/teacher", icon: <Home size={18} /> },
      { label: "Exams", href: "/dashboard/teacher/exams", icon: <BookOpen size={18} /> },
      { label: "Give Marks", href: "/dashboard/teacher/marks", icon: <FileText size={18} /> },
    ],
    Student: [
      { label: "Dashboard", href: "/dashboard/student", icon: <Home size={18} /> },
      { label: "Results", href: "/dashboard/student/results", icon: <FileText size={18} /> },
      { label: "Payments", href: "/dashboard/student/payments", icon: <CreditCard size={18} /> },
    ],
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="flex items-center justify-between p-4 border-b lg:justify-center">
          <h2 className="text-xl font-bold text-blue-600">Dashboard</h2>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4">
          {menuItems[user.role]?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
