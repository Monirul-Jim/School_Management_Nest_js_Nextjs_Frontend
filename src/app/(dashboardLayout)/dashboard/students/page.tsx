"use client";
import React from "react";
import {
  BookOpen,
  GraduationCap,
  BarChart3,
  User,
  CalendarDays,
  Bell,
  Star,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const gradeData = [
  { name: "1st Semester", grade: 3.78 },
  { name: "2nd Semester", grade: 3.85 },
  { name: "3r Semester", grade: 3.82 },
  { name: "4th Semester", grade: 2.90 },
  { name: "5th Semester", grade: 2.87 },
  { name: "6th Semester", grade: 3.92 },
];

const courses = [
  { name: "Mathematics", progress: 80 },
  { name: "Computer Science", progress: 60 },
  { name: "History", progress: 90 },
  { name: "Biology", progress: 70 },
];

const deadlines = [
  { title: "Math Assignment", date: "Sep 20, 2025" },
  { title: "Biology Lab Report", date: "Sep 25, 2025" },
  { title: "CS Project", date: "Oct 1, 2025" },
];

const notifications = [
  "Your GPA has been updated.",
  "New course materials uploaded for Computer Science.",
  "Reminder: Upcoming exam in Mathematics.",
];

export default function StudentPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        {/* Profile Header */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6 hover:shadow-lg transition">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Alex 👋</h1>
            <p className="text-gray-500">Student ID: #2025123</p>
            <p className="text-gray-500">Major: Computer Science</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
            <BookOpen className="w-10 h-10 text-blue-500" />
            <div>
              <h3 className="text-gray-500 text-sm">Courses Enrolled</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
            <GraduationCap className="w-10 h-10 text-green-500" />
            <div>
              <h3 className="text-gray-500 text-sm">Completed Credits</h3>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
            <BarChart3 className="w-10 h-10 text-purple-500" />
            <div>
              <h3 className="text-gray-500 text-sm">Current GPA</h3>
              <p className="text-2xl font-bold">3.8</p>
            </div>
          </div>
        </div>

        {/* Courses + Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Courses */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4">Current Courses</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{course.name}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grade Progress Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4">Grade Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[1.00, 4.00]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="grade"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deadlines + Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
            </div>
            <ul className="space-y-3">
              {deadlines.map((item) => (
                <li
                  key={item.title}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span>{item.title}</span>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            <ul className="space-y-3">
              {notifications.map((note, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4">Achievements</h2>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              Dean’s List
            </div>
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Perfect Attendance
            </div>
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Top in Math
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
