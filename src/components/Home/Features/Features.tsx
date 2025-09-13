'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  GraduationCap,
  BarChart3,
  CalendarCheck,
  FileText,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

const Features = () => {
  const services = [
    {
      title: 'Student Management',
      description: 'Easily manage student profiles, attendance, and progress reports.',
      icon: <Users className="w-10 h-10 text-blue-600" />,
    },
    {
      title: 'Learning Resources',
      description: 'Provide digital notes, assignments, and study materials in one place.',
      icon: <BookOpen className="w-10 h-10 text-blue-600" />,
    },
    {
      title: 'Grade Tracking',
      description: 'Teachers can upload grades, and students can access them in real time.',
      icon: <GraduationCap className="w-10 h-10 text-blue-600" />,
    },
    {
      title: 'Analytics & Reports',
      description: 'Generate detailed academic and administrative reports instantly.',
      icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
    },
    {
      title: 'Attendance System',
      description: 'Track daily student and teacher attendance with automated records.',
      icon: <CalendarCheck className="w-10 h-10 text-blue-600" />,
    },
    {
      title: 'Exams & Results',
      description: 'Conduct online exams and share results with students seamlessly.',
      icon: <FileText className="w-10 h-10 text-blue-600" />,
    },
    {
      title: 'Communication Tools',
      description: 'Facilitate teacher-student-parent communication with messaging.',
      icon: <MessageSquare className="w-10 h-10 text-blue-600" />,
    },
    {
      title: 'Data Security',
      description: 'Ensure sensitive school data is safe with top-notch security systems.',
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-gray-800 mb-6"
        >
          Our Features & Services
        </motion.h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          From student records to communication tools, SchoolMS offers everything
          your institution needs to manage daily operations with ease.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
