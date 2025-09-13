'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white overflow-hidden">
      {/* Background shapes */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-400 rounded-full opacity-30 animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
        >
          Welcome to <span className="text-yellow-300">SchoolMS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl max-w-xl"
        >
          Your one-stop solution for managing students, teachers, and school activities efficiently.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4"
        >
          <a
            href="/studentlogin"
            className="px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition"
          >
            Student Login
          </a>
          <a
            href="/login"
            className="px-6 py-3 bg-white text-blue-700 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Admin/Teacher Login
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
