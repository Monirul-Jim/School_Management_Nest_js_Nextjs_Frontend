"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1580974852861-c381510bc98a?w=500&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1664299825291-909568eb8db7?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=500&auto=format&fit=crop&q=60",
    "https://media.istockphoto.com/id/2170926979/photo/students-conducting-chemistry-experiment-in-lab.webp?a=1&b=1&s=612x612&w=0&k=20&c=xExdOLRkz404FxQChHq4eIKsXW3veSi-69Goek41Nd4=",
    "https://media.istockphoto.com/id/1187393533/photo/school-children-raised-hand-to-answer-questions-in-the-classroom-at-school.webp?a=1&b=1&s=612x612&w=0&k=20&c=12vLTIhwFZH356M1hJZF5eyysrX-_Zyj8mYlJDo6JVw=",
    "https://media.istockphoto.com/id/2163657039/photo/teacher-giving-science-lesson-to-students-in-elementary-school-classroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=f3GfWyw1BpEHdiKTYCGHGIWyPcRFrPAUIRzhTIxKW4I=",
    "https://plus.unsplash.com/premium_photo-1680807869780-e0876a6f3cd5?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&auto=format&fit=crop&q=60",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
        >
          School Gallery
        </motion.h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-center">
          Explore memorable moments from our school — classroom learning, fun
          activities, science experiments, and more.
        </p>

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl shadow-md break-inside-avoid"
            >
              <Image
                src={src}
                width={100}
                height={100}
                alt={`Gallery ${i + 1}`}
                className="w-full rounded-xl hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
