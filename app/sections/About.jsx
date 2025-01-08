'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiDownload } from 'react-icons/fi';
import { AnimatedBackground } from '../components/AnimatedBackground';

const content = {
  EN: {
    title: "About Me",
    subtitle: "Building digital experiences from Jeddah to the world",
    bio: "As a Computer Science graduate from King Abdulaziz University, I blend Saudi innovation with global tech trends. My journey in tech started with curiosity and evolved into a passion for creating impactful digital solutions.",
    education: {
      degree: "Bachelor in Computer Science",
      university: "King Abdulaziz University (KAU)",
      year: "2020-2024"
    },
    funFacts: [
      "Code Explorer",
      "Problem Solver",
      "Digital Creator",
      "Tech Enthusiast"
    ],
    downloadCV: "Download CV"
  },
  AR: {
    title: "نبذة عني",
    subtitle: "أبني تجارب رقمية من جدة إلى العالم",
    bio: "كخريج علوم الحاسب من جامعة الملك عبدالعزيز، أمزج بين الابتكار السعودي واتجاهات التقنية العالمية. بدأت رحلتي في التقنية بالفضول وتطورت إلى شغف بإنشاء حلول رقمية مؤثرة.",
    education: {
      degree: "بكالوريوس علوم الحاسب",
      university: "جامعة الملك عبدالعزيز",
      year: "٢٠٢٠-٢٠٢٤"
    },
    funFacts: [
      "مستكشف برمجي",
      "حلال مشاكل",
      "مبتكر رقمي",
      "شغوف بالتقنية"
    ],
    downloadCV: "تحميل السيرة الذاتية"
  }
};

const AnimatedTitle = ({ text, theme }) => {
  return (
    <motion.h1
      className="text-4xl md:text-5xl font-bold mb-6"
      style={{ color: theme.text }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="inline-block relative"
        whileHover={{ scale: 1.05 }}
      >
        {text}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 rounded"
          style={{ backgroundColor: theme.primary }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.span>
    </motion.h1>
  );
};

const RotatingFacts = ({ facts, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % facts.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [facts.length]);

  return (
    <div className="h-8 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full text-center"
          style={{ color: theme.primary }}
        >
          {facts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function About() {
  const { theme, language } = useTheme();
  const currentContent = content[language];
  const isRTL = language === 'AR';

  const handleDownloadCV = () => {
    // Replace with your actual CV file path
    window.open('/path-to-your-cv.pdf', '_blank');
  };

  return (
    <section 
      id="about" 
      className="min-h-screen relative overflow-hidden py-20"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <AnimatedBackground theme={theme} scrollMultiplier={0.5} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <AnimatedTitle text={currentContent.title} theme={theme} />
          <p className="text-xl" style={{ color: theme.textSecondary }}>
            {currentContent.subtitle}
          </p>
          <RotatingFacts facts={currentContent.funFacts} theme={theme} />
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="md:col-span-7 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="p-8 rounded-2xl backdrop-blur-lg"
              style={{ 
                backgroundColor: `${theme.primary}10`,
                border: `1px solid ${theme.primary}20`,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg leading-relaxed" style={{ color: theme.text }}>
                {currentContent.bio}
              </p>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                className="p-6 rounded-xl backdrop-blur-md"
                style={{ 
                  backgroundColor: `${theme.primary}15`,
                  border: `1px solid ${theme.primary}20`,
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold" style={{ color: theme.primary }}>
                    {currentContent.education.university}
                  </h3>
                  <p style={{ color: theme.text }}>
                    {currentContent.education.degree}
                  </p>
                  <p className="font-medium" style={{ color: theme.primary }}>
                    {currentContent.education.year}
                  </p>
                </div>
              </motion.div>

              <motion.button
                onClick={handleDownloadCV}
                className="w-full px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: `${theme.primary}15`,
                  color: theme.primary,
                  border: `1px solid ${theme.primary}30`
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: theme.primary,
                  color: theme.bg.split('-')[0].replace('from-', '')
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FiDownload className="w-5 h-5" />
                <span>{currentContent.downloadCV}</span>
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="md:col-span-5 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative aspect-square rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{
                border: `4px solid ${theme.primary}30`,
              }}
            >
              <Image
                src="/images/graduate.png" ///img
                alt="Developer Profile"
                fill
                className="object-cover"
                priority
              />
              <div 
                className="absolute inset-0"
                style={{ 
                  background: `radial-gradient(circle at 30% 30%, transparent 0%, ${theme.primary}30 100%)`
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}