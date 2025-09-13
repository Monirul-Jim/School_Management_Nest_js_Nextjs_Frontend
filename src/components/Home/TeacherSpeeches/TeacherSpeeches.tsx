'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const teachers = [
  {
    name: "Mrs. Ayesha Rahman",
    position: "Head Teacher",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    speech: "Welcome to our school! We strive to create an environment where students can thrive academically and personally."
  },
  {
    name: "Mr. John Smith",
    position: "Math Teacher",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    speech: "Teaching is a passion here. Our students are curious and eager to learn every day."
  },
  {
    name: "Ms. Emily Clark",
    position: "Science Teacher",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    speech: "Science comes alive in our classrooms! We encourage experimentation and critical thinking."
  },
];

const TeacherSpeeches = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className=" mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-center"
        >
          Meet Our Educators
        </motion.h2>
        <p className="text-gray-600 mb-16 text-center max-w-3xl mx-auto text-lg">
          Inspiring words from our Head Teacher and staff members who shape the future of our students.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Head Teacher */}
          <motion.div
            key={teachers[0].name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center text-center border-4 border-blue-500 hover:scale-105 transition-transform duration-500"
          >
            <div className="relative w-40 h-40 mb-6">
              <Image
                src={teachers[0].photo}
                alt={teachers[0].name}
                loading="lazy"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{teachers[0].name}</h3>
            <span className="text-lg text-blue-600 mb-4">{teachers[0].position}</span>
            <p className="text-gray-700 italic relative before:absolute before:-top-3 before:-left-3 before:text-4xl before:content-['“']">
              {teachers[0].speech}
            </p>
          </motion.div>

          {/* Other Teachers */}
          {teachers.slice(1).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gradient-to-tr from-blue-50 to-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center border border-blue-200 hover:shadow-2xl hover:scale-105 transition-transform duration-500"
            >
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  fill
                  className="rounded-full object-cover border-4 border-blue-300"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-1">{t.name}</h3>
              <span className="text-sm text-blue-600 mb-4">{t.position}</span>
              <p className="text-gray-700 italic relative before:absolute before:-top-2 before:-left-2 before:text-3xl before:content-['“']">
                {t.speech}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeacherSpeeches;
