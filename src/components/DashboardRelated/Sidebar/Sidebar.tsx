'use client';

import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { Users, BookOpen, FileText, CreditCard, Home, X, ChevronDown, ChevronUp } from "lucide-react";
import { RootState } from "@/redux/feature/store";
import { useAppSelector } from "@/redux/feature/hook";

// Define a new type for nested menu items
type MenuItem = {
  label: string;
  href?: string; // href is optional for dropdown parents
  icon: JSX.Element;
  subItems?: { label: string; href: string }[]; // Sub-items for dropdown
};

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [isClient, setIsClient] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !user) return null;

  const menuItems: Record<string, MenuItem[]> = {
    Admin: [
      { label: "Dashboard", href: "/dashboard/admin", icon: <Home size={18} /> },
      { label: "User Management", href: "/dashboard/admin/usermanagement", icon: <Home size={18} /> },
       {
        label: "Class Management",
        icon: <Users size={18} />,
        subItems: [
          { label: "Classes", href: "/dashboard/admin/createclasses" },
        ],
      },
      {
        label: "Student Management",
        icon: <Users size={18} />,
        subItems: [
          { label: "Create Student", href: "/dashboard/admin/studentmanagement" },
        ],
      },
       {
        label: "Subject Management",
        icon: <Users size={18} />,
        subItems: [
          { label: "Create Subject", href: "/dashboard/admin/createsubject" },
          { label: "Assign Subject", href: "/dashboard/admin/assignsubject" },
        ],
      },
     
      
    ],
    Teacher: [
      { label: "Dashboard", href: "/dashboard/teacher", icon: <Home size={18} /> },
      { label: "Exams", href: "/dashboard/teacher/studentmarks", icon: <BookOpen size={18} /> },
      { label: "Give Marks", href: "/dashboard/teacher/marks", icon: <FileText size={18} /> },
    ],
    Student: [
      { label: "Dashboard", href: "/dashboard/student", icon: <Home size={18} /> },
      { label: "Results", href: "/dashboard/student/results", icon: <FileText size={18} /> },
      { label: "Payments", href: "/dashboard/student/payments", icon: <CreditCard size={18} /> },
    ],
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
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
          {user.role && menuItems[user.role] ? (
            menuItems[user.role].map((item) => (
              <div key={item.label}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium">
                        {item.icon}
                        {item.label}
                      </span>
                      {openDropdown === item.label ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openDropdown === item.label && (
                      <div className="flex flex-col gap-2 pl-8 mt-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition"
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )}
              </div>
            ))
          ) : null}
        </nav>
      </div>
    </>
  );
}
