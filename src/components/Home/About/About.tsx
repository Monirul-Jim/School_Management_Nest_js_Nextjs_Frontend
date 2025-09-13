'use client';
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gray-800 mb-6"
          >
            About <span className="text-blue-600">SchoolMS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto"
          >
            SchoolMS is a modern, user-friendly school management platform that helps
            administrators, teachers, and students stay organized and connected. 
            We believe education should be supported by technology that’s 
            simple, reliable, and effective.
          </motion.p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-4">
          {[
            {
              title: "Our Mission",
              text: "Empower schools with digital tools that simplify management and enhance learning experiences.",
            },
            {
              title: "Our Vision",
              text: "To become the world’s most trusted and widely used school management system.",
            },
            {
              title: "Our Values",
              text: "Innovation, transparency, collaboration, and a student-first mindset drive everything we do.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white shadow p-8 rounded-xl hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-gray-800 mb-6"
          >
            Our Story
          </motion.h2>
          <p className="text-gray-600 text-lg mb-12">
            Founded in 2023, SchoolMS was built to solve the daily challenges
            schools face in managing students, teachers, and administration. 
            Today, we serve schools of all sizes by making education more 
            connected and accessible.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="font-semibold text-blue-600 mb-2">2023</h3>
              <p className="text-gray-600">Idea born to create a better school system.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="font-semibold text-blue-600 mb-2">2024</h3>
              <p className="text-gray-600">Beta version launched with first partner schools.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="font-semibold text-blue-600 mb-2">Future</h3>
              <p className="text-gray-600">Expanding globally to empower every classroom.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Why Choose SchoolMS?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {["Student Portal", "Teacher Dashboard", "Real-time Grades", "Parent Communication"].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-blue-600">{feature}</h3>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to experience SchoolMS?</h2>
        <p className="mb-6">Join thousands of students and teachers using our system.</p>
        <a
          href="/login"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default About;
