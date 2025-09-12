"use client";

import React from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  BookOpen,
  BarChart2,
  Bell,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Sample data for charts
const studentsPerClassData = [
  { class: "Class One", students: 30 },
  { class: "Class Two", students: 28 },
  { class: "Class Three", students: 32 },
  { class: "Class Four", students: 25 },
];

const coursesProgressData = [
  { name: "Completed", value: 40 },
  { name: "In Progress", value: 35 },
  { name: "Pending", value: 25 },
];

const COLORS = ["#4ade80", "#facc15", "#f87171"]; // green, yellow, red

export default function AdminDashboardPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin!</h1>
        <p className="mt-2 text-gray-600">
          Manage users, courses, teachers, students, and monitor system activities.
        </p>
      </header>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-gray-600 text-sm mt-1">350 users</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <UserCheck size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Teachers</h2>
            <p className="text-gray-600 text-sm mt-1">25 active teachers</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
            <UserPlus size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Students</h2>
            <p className="text-gray-600 text-sm mt-1">325 enrolled students</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
          <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Courses</h2>
            <p className="text-gray-600 text-sm mt-1">12 active courses</p>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Students per Class Bar Chart */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={20} className="text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Students Per Class</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={studentsPerClassData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Courses Progress Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={20} className="text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Courses Progress</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={coursesProgressData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {coursesProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
            Add Student
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
            Add Teacher
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition">
            Add Course
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition">
            Generate Report
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={20} className="text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Notifications</h2>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li>📌 Added new teacher to the Science department</li>
          <li>📌 Updated student records for Class Three</li>
          <li>📌 Created a new course: Advanced Mathematics</li>
          <li>📌 Reviewed system logs and user activity</li>
          <li>📌 Sent announcement to all teachers about training</li>
        </ul>
      </section>
    </div>
  );
}
