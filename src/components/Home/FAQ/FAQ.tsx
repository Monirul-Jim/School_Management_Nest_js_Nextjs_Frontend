'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is the admission process?",
    answer:
      "Our admission process includes submitting an application, attending an interaction session, and evaluation to ensure the best fit for your child."
  },
  {
    question: "What extracurricular activities are offered?",
    answer:
      "We offer sports, music, dance, arts, science clubs, and various competitions to ensure holistic development."
  },
  {
    question: "What is the student-teacher ratio?",
    answer:
      "We maintain a low student-teacher ratio to provide personalized attention and ensure effective learning."
  },
  {
    question: "Is transportation provided?",
    answer:
      "Yes, safe and reliable school transportation is available for students within designated routes."
  },
  {
    question: "What curriculum does the school follow?",
    answer:
      "Our school follows the national/state curriculum with emphasis on modern teaching methods and life skills."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          Frequently Asked Questions
        </motion.h2>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Have questions? Here are answers to some of the most common questions about our school.
        </p>

        {/* FAQ List */}
        <div className="space-y-4  mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-gray-600" />
                ) : (
                  <ChevronDown className="text-gray-600" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
