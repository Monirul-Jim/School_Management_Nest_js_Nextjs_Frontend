"use client";

import dynamic from "next/dynamic";

// Dynamic imports with SSR disabled if needed (for heavy client-only components)
const Banner = dynamic(() => import("@/components/Home/Banner/Banner"));
const TeacherSpeeches = dynamic(() => import("@/components/Home/TeacherSpeeches/TeacherSpeeches"));
const TeacherCarousel = dynamic(() => import("@/components/Home/TeacherCarousel/TeacherCarousel"));
const Features = dynamic(() => import("@/components/Home/Features/Features"));
const Testimonials = dynamic(() => import("@/components/Home/Testimonials/Testimonials"));
const Contact = dynamic(() => import("@/components/Home/Contact/Contact"));
const FAQ = dynamic(() => import("@/components/Home/FAQ/FAQ"));

export default function Home() {
  return (
    <>
      <Banner />
      <TeacherSpeeches />
      <TeacherCarousel />
      <Features />
      <Testimonials />
      <Contact />
      <FAQ />
    </>
  );
}
