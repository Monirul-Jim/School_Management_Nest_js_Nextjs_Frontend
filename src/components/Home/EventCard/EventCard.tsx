'use client';
import React from 'react';
import { motion } from 'framer-motion';

const events = [
  {
    title: "Annual Science Fair",
    date: "2025-10-15",
    description:
      "Students showcase their innovative science projects and experiments.",
    type: "Science",
  },
  {
    title: "Sports Day",
    date: "2025-11-05",
    description:
      "Fun-filled day with athletics, games, and team competitions for all grades.",
    type: "Sports",
  },
  {
    title: "Art & Music Exhibition",
    date: "2025-12-01",
    description:
      "Display of creative artwork and musical performances by students.",
    type: "Arts",
  },
  {
    title: "Debate Competition",
    date: "2026-01-10",
    description:
      "Inter-school debate competition to enhance critical thinking and public speaking skills.",
    type: "Academics",
  },
];

const EventCard = ({ event }: { event: typeof events[0] }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="relative bg-white/50 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 overflow-hidden"
  >
    {/* Ice Ribbon */}
    <div className="absolute -top-3 left-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
      {event.type}
    </div>

    {/* Date */}
    <span className="block text-gray-700/80 text-sm mt-4 mb-2">
      {new Date(event.date).toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
    </span>

    {/* Title */}
    <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>

    {/* Description */}
    <p className="text-gray-700/90 text-sm leading-relaxed">{event.description}</p>

    {/* Frosty Glow Circle */}
    <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-tr from-blue-300 to-cyan-200 opacity-30 blur-3xl pointer-events-none"></div>
  </motion.div>
);

const EventsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-cyan-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 text-center"
        >
          Upcoming School Events
        </motion.h2>
        <p className="text-gray-600/90 mb-16 text-center max-w-2xl mx-auto">
          Join our exciting school events — from sports and arts to science and competitions. Stay updated and be part of the fun!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {events.map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
