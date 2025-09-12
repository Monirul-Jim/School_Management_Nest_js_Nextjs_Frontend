"use client";

import React from "react";
import { Users, ClipboardList, Bell, BookOpen } from "lucide-react";

export default function TeacherDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Teacher!</h1>
        <p className="mt-2 text-gray-600">
          Manage your classes, assignments, students, and stay up-to-date with notifications.
        </p>
      </header>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Classes Card */}
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Classes</h2>
            <p className="text-gray-600 text-sm mt-1">You are managing 5 classes</p>
          </div>
        </div>

        {/* Students Card */}
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Students</h2>
            <p className="text-gray-600 text-sm mt-1">You have 120 students</p>
          </div>
        </div>

        {/* Assignments Card */}
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
            <ClipboardList size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Assignments</h2>
            <p className="text-gray-600 text-sm mt-1">15 pending assignments to review</p>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-full">
            <Bell size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="text-gray-600 text-sm mt-1">You have 3 new messages</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <ul className="space-y-3 text-gray-700">
          <li>📌 Reviewed Math assignments for Class One</li>
          <li>📌 Uploaded attendance for Class Two</li>
          <li>📌 Scheduled English exam for next week</li>
          <li>📌 Sent reminder to students about project submission</li>
        </ul>
      </section>
    </div>
  );
}
