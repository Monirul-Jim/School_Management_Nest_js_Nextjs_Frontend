'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Teacher {
  name: string;
  classTeacher: string;
  subject: string;
  photo: string;
  speech: string;
}

const TeacherCarousel = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const cardsToShow = 3;
  const scrollInterval = 4000; // Auto-scroll interval in milliseconds

  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data: Teacher[] = Array.from({ length: 25 }).map((_, i) => ({
      name: `Teacher ${i + 1}`,
      classTeacher: `Grade ${i % 12 + 1}`,
      subject: ["Math", "Science", "English", "History", "Art"][i % 5],
      photo: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 10}.jpg`,
      speech: "I enjoy teaching students and helping them achieve their best in academics and personal growth."
    }));
    setTeachers(data);
  }, []);

  // Handle auto-scrolling
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHovering && teachers.length > cardsToShow) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % teachers.length);
      }, scrollInterval);
    }
    return () => clearInterval(timer);
  }, [isHovering, teachers.length, cardsToShow]);

  // Handle smooth transition on index change
  useEffect(() => {
    if (teachers.length > 0 && carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].clientWidth + 24; // Card width + gap
      controls.start({
        x: `-${currentIndex * cardWidth}px`,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      });
    }
  }, [currentIndex, teachers.length, controls]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teachers.length) % teachers.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teachers.length);
  };

  return (
    <section className="py-24 bg-gray-100">
      <div className=" mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
          Meet Our Teachers
        </h2>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            ref={carouselRef}
            className="flex gap-6"
            animate={controls}
          >
            {teachers.map((teacher, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="min-w-[300px] bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex-shrink-0 text-center"
              >
                <Image
                  src={teacher.photo}
                  alt={teacher.name}
                  loading="lazy"
                  width={150}
                  height={150}
                  className="rounded-full border-4 border-blue-500 mb-6 object-cover mx-auto transform transition-transform duration-300 hover:scale-110"
                />
                <h3 className="text-2xl font-bold text-gray-800">{teacher.name}</h3>
                <span className="text-base text-blue-600 font-medium">
                  {teacher.subject} | Class Teacher: {teacher.classTeacher}
                </span>
                <p className="text-gray-700 mt-4 text-sm italic">{teacher.speech}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute top-1/2 -translate-y-1/2 -left-4 p-3 bg-white rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute top-1/2 -translate-y-1/2 -right-4 p-3 bg-white rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {teachers.map((_, i) => (
            <span
              key={i}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                i === currentIndex
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeacherCarousel;
