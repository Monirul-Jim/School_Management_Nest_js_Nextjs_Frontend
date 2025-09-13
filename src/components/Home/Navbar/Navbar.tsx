"use client";

import { useAppSelector } from "@/redux/feature/hook";
import { RootState } from "@/redux/feature/store";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state: RootState) => state.auth.user);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Determine where login link should go if no user
  const loginLink = !user
    ? user?.role === "Student"
      ? "/studentlogin"
      : "/login"
    : "#";
console.log("User in Navbar:", user);
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-600">
              SchoolMS
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </a>
            {user ? (
              <>
                {user.role === "Student" && (
                  <a href="/grades" className="text-gray-700 hover:text-blue-600 font-medium">
                    My Grades
                  </a>
                )}
                <a href="/profile" className="text-gray-700 hover:text-blue-600 font-medium">
                  Profile
                </a>
                <a
                  href="#"
                  className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
                >
                  Logout
                </a>
              </>
            ) : (
              <a
                href={loginLink}
                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-4 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            {user ? (
              <>
                {user.role === "Student" && (
                  <a
                    href="/grades"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    My Grades
                  </a>
                )}
                <a
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </a>
              </>
            ) : (
              <a
                href={loginLink}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Login
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
