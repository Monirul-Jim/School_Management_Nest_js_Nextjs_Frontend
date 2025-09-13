// app/not-found.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      router.back();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6 text-center">
      <h1 className="text-[10rem] font-extrabold text-blue-600 select-none drop-shadow-lg">
        404
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-8">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleGoBack}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold shadow-md hover:bg-gray-300 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
      </div>

      <p className="mt-8 text-gray-400 text-sm select-none">
        © 2025 MySchool. All rights reserved.
      </p>
    </div>
  );
}
