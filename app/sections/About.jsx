'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiDownload } from 'react-icons/fi';
import { FaGraduationCap, FaUniversity } from 'react-icons/fa';
import { useGesture } from '@use-gesture/react';



// Custom reduced motion hook
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

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
    downloadCV: "Download CV",
    cvSize: "(PDF, 2.5MB)",
    altImage: "Seba Salamah graduation photo"
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
    downloadCV: "تحميل السيرة الذاتية",
    cvSize: "(PDF, ٢.٥ ميجابايت)",
    altImage: "صورة تخرج صبا سلامة"
  }
};

const AnimatedTitle = ({ text }) => {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.h1
      className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-text-primary"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: prefersReducedMotion ? {} : { staggerChildren: 0.1 }
        }
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={{
            hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: prefersReducedMotion 
                ? { duration: 0.3 }
                : { 
                    type: 'spring',
                    stiffness: 120,
                    damping: 12
                  }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const RotatingFacts = ({ facts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const bind = useGesture({
    onSwipedLeft: () => {
      setCurrentIndex(prev => (prev + 1) % facts.length);
    },
    onSwipedRight: () => {
      setCurrentIndex(prev => (prev - 1 + facts.length) % facts.length);
    }
  });

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % facts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [facts.length, prefersReducedMotion]);

  return (
    <div {...bind()} className="h-16 relative overflow-hidden my-6 touch-pan-x">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: prefersReducedMotion ? 0 : 0.5, 
            ease: [0.4, 0, 0.2, 1] 
          }}
          className="absolute w-full text-center text-3xl md:text-4xl font-bold text-secondary"
        >
          {facts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CVButton = ({ onClick, text, ariaLabel, isDark }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold overflow-hidden group mobile-tap-target"
      whileHover={{ 
        scale: 1.05,
        transition: { type: 'spring', stiffness: 300 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label={ariaLabel}
      style={{ willChange: 'transform' }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(45deg, ${isDark ? '#58BCFB' : '#3A8679'}, ${isDark ? '#FD5B78' : '#E07A5F'})`,
            `linear-gradient(135deg, ${isDark ? '#58BCFB' : '#3A8679'}, ${isDark ? '#FD5B78' : '#E07A5F'})`
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      
      <motion.span 
        className="relative flex items-center gap-3 z-10 text-white"
        whileHover={{ scale: 1.05 }}
      >
        <FiDownload className="w-5 h-5" />
        <span>{text}</span>
      </motion.span>
    </motion.button>
  );
};

const AnimatedCard = ({ children }) => (
  <motion.div
    className="p-6 md:p-8 rounded-2xl bg-background-card border border-border shadow-xl hover:shadow-2xl transition-all"
    whileHover={{ y: -5 }}
    transition={{ type: 'spring', stiffness: 200 }}
    style={{ willChange: 'transform' }}
  >
    {children}
  </motion.div>
);

export default function About() {
  const { language, isDark } = useTheme();
  const currentContent = content[language];
  const isRTL = language === 'AR';
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8], { clamp: false });

  const handleDownloadCV = () => {
    try {
      window.open('/cv-seba-salamah.pdf', '_blank');
    } catch (error) {
      console.error('Failed to download CV:', error);
      alert(language === 'EN' 
        ? 'Failed to download CV. Please try again later.' 
        : 'تعذر تنزيل السيرة الذاتية. يرجى المحاولة لاحقًا.'
      );
    }
  };

  return (
    <section 
      id="about" 
      className="relative min-h-screen"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <motion.div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-background via-background-card/90 to-background"
        style={{ 
          opacity,
          backgroundImage: `url('/noise.png'), linear-gradient(to bottom, var(--color-background), var(--color-background-card) 90%, var(--color-background))`,
          backgroundBlendMode: 'multiply'
        }}
      />

      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="text-center mb-16"
            >
              <AnimatedTitle text={currentContent.title} />
              
              <motion.p 
                className="text-xl md:text-2xl max-w-3xl mx-auto font-light text-text-secondary mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentContent.subtitle}
              </motion.p>
              
              <RotatingFacts facts={currentContent.funFacts} />
            </motion.div>
          </AnimatePresence>

          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
            <motion.div 
              className="md:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <AnimatedCard>
                <motion.div
                  className="text-lg md:text-xl leading-relaxed text-text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {currentContent.bio.split('. ').map((sentence, index) => (
                    <motion.span
                      key={index}
                      className="block mb-4 last:mb-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4,
                        ease: 'easeOut'
                      }}
                    >
                      {sentence}.
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatedCard>

              <div className="space-y-8">
                <AnimatedCard>
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-center gap-4 mb-6 cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => window.open('https://www.kau.edu.sa', '_blank')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="p-3 rounded-full bg-primary/10 text-primary mobile-tap-target"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <FaUniversity className="w-8 h-8" />
                      </motion.div>
                      <h3 className="text-2xl md:text-3xl font-bold text-primary hover:underline">
                        {currentContent.education.university}
                      </h3>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div 
                        className="p-3 rounded-full bg-secondary/10 text-secondary mobile-tap-target"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FaGraduationCap className="w-6 h-6" />
                      </motion.div>
                      <p className="text-lg md:text-xl text-text-primary">
                        {currentContent.education.degree}
                      </p>
                    </motion.div>
                    
                    <motion.p 
                      className="font-medium text-secondary mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {currentContent.education.year}
                    </motion.p>
                  </div>
                </AnimatedCard>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <CVButton 
                    onClick={handleDownloadCV}
                    text={currentContent.downloadCV}
                    ariaLabel={`${currentContent.downloadCV} ${currentContent.cvSize}`}
                    isDark={isDark}
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="md:col-span-5 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <motion.div
                className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-border shadow-2xl hover:shadow-3xl transition-all"
                whileHover={{ 
                  scale: 1.02,
                  rotate: 1,
                  transition: { type: 'spring', stiffness: 200 }
                }}
                animate={{
                  y: [0, 15, -15, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ willChange: 'transform' }}
              >
                <Image
                  src="/images/graduate.png"
                  alt={currentContent.altImage}
                  fill
                  className="object-cover"
                  priority
                  fetchPriority="high"
                  quality={100}
                  placeholder="blur"
                  blurDataURL="/images/graduate-blur.jpg"
                  sizes="(max-width: 768px) 90vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}