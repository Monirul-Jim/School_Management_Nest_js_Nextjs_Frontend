'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const socialIcons = [
    { Icon: Facebook, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Instagram, href: '#' },
    { Icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">About SchoolMS</h3>
          <p className="text-gray-300">
            SchoolMS is a modern school management system that helps you manage students, teachers, and activities efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/studentlogin" className="hover:text-yellow-400 transition">
                Student Login
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-yellow-400 transition">
                Admin/Teacher Login
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-yellow-400 transition">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-4">
            123 School Street<br />
            City, Country<br />
            Email: info@schoolms.com
          </p>
          <div className="flex space-x-4">
            {socialIcons.map(({ Icon, href }, idx) => (
              <motion.a
                key={idx}
                href={href}
                whileHover={{ scale: 1.2, color: '#FFD700' }}
                className="text-gray-300 hover:text-yellow-400 transition"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-800 py-4 text-center text-gray-300">
        &copy; {new Date().getFullYear()} SchoolMS. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
