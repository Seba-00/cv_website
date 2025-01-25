'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiDownload } from 'react-icons/fi';
import { AnimatedBackground } from '../components/AnimatedBackground';

// Content object remains the same...
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

// Component definitions remain the same...
const AnimatedTitle = ({ text, theme }) => {
  return (
    <motion.h1
      className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
      style={{ 
        color: theme.text,
        fontFamily: 'Montserrat, sans-serif',
        letterSpacing: '-0.05em'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.h1>
  );
};

const RotatingFacts = ({ facts, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % facts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [facts.length]);

  return (
    <div className="h-16 relative overflow-hidden my-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full text-center text-3xl md:text-4xl font-bold"
          style={{ 
            color: theme.secondary,
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          {facts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CVButton = ({ onClick, text, theme }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-white overflow-hidden group"
      style={{
        background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        boxShadow: `0 4px 10px ${theme.shadowColor}`,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${theme.secondary} 0%, ${theme.primary} 100%)`,
          opacity: 0
        }}
        whileHover={{ opacity: 1 }}
      />
      <motion.span className="relative flex items-center gap-2">
        <FiDownload className="w-5 h-5" />
        {text}
      </motion.span>
    </motion.button>
  );
};

export default function About() {
  const { theme, language } = useTheme();
  const currentContent = content[language];
  const isRTL = language === 'AR';

  const handleDownloadCV = () => {
    window.open('/path-to-your-cv.pdf', '_blank');
  };

  return (
    <section 
      id="about" 
      className="relative min-h-screen"
      style={{
        background: `linear-gradient(${theme.bg.replace('from-', '').replace('via-', '').replace('to-', '')})`,
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Content Container */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <AnimatedTitle text={currentContent.title} theme={theme} />
            <motion.p 
              className="text-xl max-w-2xl mx-auto font-light"
              style={{ 
                color: theme.textSecondary,
                fontFamily: 'Open Sans, sans-serif'
              }}
            >
              {currentContent.subtitle}
            </motion.p>
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
                className="p-8 rounded-2xl"
                style={{ 
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.borderColor}`,
                  boxShadow: `0 4px 6px ${theme.shadowColor}`
                }}
                whileHover={{ scale: 1.02 }}
              >
                <p 
                  className="text-lg leading-relaxed"
                  style={{ 
                    color: theme.text,
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                >
                  {currentContent.bio}
                </p>
              </motion.div>

              <div className="space-y-6">
                <motion.div
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: theme.cardBg,
                    border: `1px solid ${theme.borderColor}`,
                    boxShadow: `0 4px 6px ${theme.shadowColor}`
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="space-y-2">
                    <h3 
                      className="text-2xl font-bold"
                      style={{ 
                        color: theme.primary,
                        fontFamily: 'Montserrat, sans-serif'
                      }}
                    >
                      {currentContent.education.university}
                    </h3>
                    <p 
                      className="text-lg"
                      style={{ 
                        color: theme.text,
                        fontFamily: 'Open Sans, sans-serif'
                      }}
                    >
                      {currentContent.education.degree}
                    </p>
                    <p 
                      className="font-medium"
                      style={{ color: theme.secondary }}
                    >
                      {currentContent.education.year}
                    </p>
                  </div>
                </motion.div>

                <CVButton 
                  onClick={handleDownloadCV}
                  text={currentContent.downloadCV}
                  theme={theme}
                />
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
                  border: `4px solid ${theme.borderColor}`,
                  boxShadow: `0 8px 16px ${theme.shadowColor}`
                }}
              >
                <Image
                  src="/images/graduate.png"
                  alt="Developer Profile"
                  fill
                  className="object-cover"
                  priority
                />
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: `radial-gradient(circle at 30% 30%, transparent 0%, ${theme.shadowColor} 100%)`
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}