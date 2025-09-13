'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: "Sophia Lee",
    role: "Student",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "The school has made learning so much fun! The teachers are supportive and the environment is inspiring."
  },
  {
    name: "Mr. John Smith",
    role: "Teacher",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Teaching here is rewarding. Students are curious, engaged, and motivated to learn every day."
  },
  {
    name: "Emily Clark",
    role: "Parent",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "I’m impressed by the school’s balance of academics and extracurricular activities. My child loves it here!"
  },
  {
    name: "Michael Brown",
    role: "Student",
    photo: "https://randomuser.me/api/portraits/men/41.jpg",
    quote: "I love the hands-on activities and interactive lessons. It’s made me more confident in my studies!"
  },
  {
    name: "Mrs. Lisa Adams",
    role: "Teacher",
    photo: "https://randomuser.me/api/portraits/women/22.jpg",
    quote: "The students are incredibly motivated and it’s wonderful to see their growth every semester."
  },
  {
    name: "Tom Wilson",
    role: "Parent",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    quote: "Communication with teachers is excellent, and my child has thrived in this supportive environment."
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className=" mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-gray-800 mb-4 text-center"
        >
          What People Say
        </motion.h2>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Hear from our students, teachers, and parents about their experiences.
        </p>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`p-6 rounded-3xl shadow-lg flex flex-col items-center text-center border transition-shadow duration-300 ${
                i % 2 === 0 ? 'bg-white border-gray-100 hover:shadow-2xl' : 'bg-blue-50 border-blue-100 hover:shadow-2xl'
              }`}
            >
              <Image
                src={t.photo}
                alt={t.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-blue-500"
              />
              <p className="text-gray-700 mb-4 italic relative before:content-['“'] before:text-4xl before:absolute before:-top-2 before:-left-2">
                {t.quote}
              </p>
              <h3 className="text-xl font-semibold text-gray-800">{t.name}</h3>
              <span className="text-sm text-gray-500">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
