"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  School,
  GalleryVertical,
  LogIn,
  User,
  LogOut,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/feature/hook";
import { RootState } from "@/redux/feature/store";
import { logout } from "@/redux/feature/auth/authSlice";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: School },
  { name: "Gallery", href: "/gallery", icon: GalleryVertical },
  { name: "Events", href: "/events", icon: GalleryVertical },
  { name: "Achievements", href: "/achievements", icon: GalleryVertical },
];

const menuVariants = {
  initial: { opacity: 0, x: "-100%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "-100%" },
};

const dropdownVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDropdown = (name: string) => {
    setIsDropdownOpen(isDropdownOpen === name ? null : name);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const dashboardLink = user
    ? user.role === "Admin"
      ? "/dashboard/admin"
      : user.role === "Teacher"
      ? "/dashboard/teacher"
      : "/dashboard/students"
    : null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm shadow-md py-4 lg:py-0 transition-all duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold text-gray-800 tracking-tight">
          <span className="text-blue-600">School</span>MS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 font-medium py-6 px-3 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}

          {mounted && (
            <>
              {user ? (
                <>
                  <Link
                    href={dashboardLink!}
                    className="text-gray-600 hover:text-blue-600 font-medium py-6 px-3 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-600 hover:text-blue-600 font-medium py-6 px-3 transition-colors duration-200"
                  >
                    <LogOut className="mr-1 h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <div
                  className="relative flex items-center cursor-pointer text-gray-600 hover:text-blue-600 font-medium py-6 px-3 transition-colors duration-200"
                  onMouseEnter={() => toggleDropdown("Login")}
                  onMouseLeave={() => toggleDropdown("Login")}
                >
                  <span>Login</span>
                  <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform duration-200 transform ${
                      isDropdownOpen === "Login" ? "rotate-180" : "rotate-0"
                    }`}
                  />
                  <AnimatePresence>
                    {isDropdownOpen === "Login" && (
                      <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={dropdownVariants}
                        className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-xl overflow-hidden"
                      >
                        <Link
                          href="/studentlogin"
                          className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <User className="h-4 w-4 text-gray-500" />
                          <span>Student Login</span>
                        </Link>
                        <Link
                          href="/login"
                          className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <User className="h-4 w-4 text-gray-500" />
                          <span>Admin/Teacher Login</span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && mounted && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={menuVariants}
            className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg py-4 transition-all duration-300 overflow-y-auto"
          >
            <div className="flex flex-col space-y-2 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    href={dashboardLink!}
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="mr-1 h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/studentlogin"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Student Login
                  </Link>
                  <Link
                    href="/login"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin/Teacher Login
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
