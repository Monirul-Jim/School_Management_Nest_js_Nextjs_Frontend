'use client';
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";

interface Achievement {
  title: string;
  count: number;
  icon: React.ReactNode;
}

interface TeacherAward {
  name: string;
  subject: string;
  photo: string;
  award: string;
  from: string;
  speech: string;
}

// Achievements Data
const achievements: Achievement[] = [
  { title: "Students Enrolled", count: 1200, icon: "🎓" },
  { title: "Awards Won", count: 85, icon: "🏆" },
  { title: "Years of Excellence", count: 25, icon: "📚" },
  { title: "Certified Teachers", count: 50, icon: "👩‍🏫" },
];

// Teacher Awards Data
const teacherAwards: TeacherAward[] = [
  {
    name: "Mrs. Angela White",
    subject: "Mathematics",
    photo: "https://randomuser.me/api/portraits/women/50.jpg",
    award: "Best Teacher Award 2025",
    from: "Minister of Education",
    speech:
      "I am honored to receive this award and continue inspiring students to love learning.",
  },
  {
    name: "Mr. David Brown",
    subject: "Science",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    award: "Excellence in Teaching",
    from: "Famous Scientist Dr. Albert",
    speech:
      "Grateful to be recognized for fostering curiosity and critical thinking in students.",
  },
  {
    name: "Ms. Clara Johnson",
    subject: "English",
    photo: "https://randomuser.me/api/portraits/women/35.jpg",
    award: "Outstanding Educator",
    from: "City Mayor",
    speech: "Teaching is my passion, and receiving this award motivates me even more.",
  },
];

// Animated Number Component
const AnimatedNumber = ({ value }: { value: number }) => {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.5,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, motionValue]);

  return <span>{display}</span>;
};

const AchievementsWithTeacherAwards = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-gray-800 mb-4 text-center"
        >
          Awards & Achievements
        </motion.h2>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Our school prides itself on excellence. Check out our achievements and honored teachers.
        </p>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{achievement.icon}</div>
              <div className="text-4xl font-extrabold text-blue-600 mb-2">
                <AnimatedNumber value={achievement.count} />
              </div>
              <p className="text-gray-700 font-medium">{achievement.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Teacher Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teacherAwards.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                width={120}
                height={120}
                loading="lazy"
                src={t.photo}
                alt={t.name}
                className="rounded-full border-4 border-blue-500 mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{t.name}</h3>
              <span className="text-sm text-blue-600 mb-2">
                {t.subject} | {t.award}
              </span>
              <span className="text-gray-500 text-sm mb-4">Awarded by: {t.from}</span>
              <p className="text-gray-700 italic">{`"${t.speech}"`}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsWithTeacherAwards;
