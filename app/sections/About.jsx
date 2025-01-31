'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiDownload } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { AnimatedBackground } from '../components/AnimatedBackground';
import PageTransition from '../components/PageTransition';

const RotatingText = ({ texts }) => {
  const [index, setIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2000); // Faster rotation

    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <div className="h-12 relative overflow-hidden">
      <motion.div
        key={index}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.2 }} // Faster transition
        className="absolute w-full text-xl text-secondary font-medium"
      >
        {texts[index]}
      </motion.div>
    </div>
  );
};

export default function About() {
  const { language } = useTheme();
  const currentContent = content[language];
  const isRTL = language === 'AR';

  return (
    <PageTransition>
      <section 
        id="about" 
        className="relative min-h-screen"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <AnimatedBackground />
        
        <div className="relative z-10 pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold text-text-primary mb-4">
                    {currentContent.title}
                  </h1>
                  <RotatingText texts={currentContent.traits} />
                </div>

                <p className="text-lg text-text-secondary leading-relaxed">
                  {currentContent.bio}
                </p>

                <motion.div 
                  className="bg-background-card p-6 rounded-xl"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <FaGraduationCap className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {currentContent.education.degree}
                      </h3>
                      <p className="text-text-secondary">
                        {currentContent.education.university}
                      </p>
                    </div>
                  </div>
                  <p className="text-secondary">{currentContent.education.year}</p>
                </motion.div>

                <motion.button
                  onClick={() => window.open('/cv-seba-salamah.pdf', '_blank')}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiDownload className="w-5 h-5" />
                  {currentContent.downloadCV}
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-2xl overflow-hidden"
              >
                <Image
                  src="/images/graduate.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}




/*'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiDownload, FiSun, FiMoon, FiX, FiMenu } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaGraduationCap, FaUniversity } from 'react-icons/fa';
import { IoLanguage } from 'react-icons/io5';
import { useGesture } from '@use-gesture/react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import Link from 'next/link';

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

const NavItem = React.memo(({ title, isActive, onClick, href, isRTL }) => (
  <motion.div
    className="relative px-3 py-1.5 group font-medium"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    {href ? (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative z-10 transition-colors duration-200 ${
          isActive ? 'text-primary font-semibold' : 'text-text-secondary hover:text-primary'
        } focus:outline-none focus:ring-2 focus:ring-primary/50`}
        aria-label={`${title} (opens in new tab)`}
      >
        {title}
      </Link>
    ) : (
      <button
        onClick={onClick}
        className={`relative z-10 transition-colors duration-200 ${
          isActive ? 'text-primary font-semibold' : 'text-text-secondary hover:text-primary'
        } focus:outline-none focus:ring-2 focus:ring-primary/50`}
        aria-current={isActive ? 'page' : undefined}
      >
        {title}
      </button>
    )}
    {isActive && !href && (
      <motion.div
        layoutId="navIndicator"
        className="absolute bottom-0 left-1/2 w-4/5 h-1 -translate-x-1/2 rounded-full bg-primary"
        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
      />
    )}
  </motion.div>
));

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
    altImage: "Seba Salamah graduation photo",
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      resume: 'Resume',
    },
    graduateStatus: 'Computer Science Graduate',
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
    altImage: "صورة تخرج صبا سلامة",
    nav: {
      home: 'الرئيسية',
      about: 'نبذة عني',
      skills: 'المهارات',
      projects: 'المشاريع',
      contact: 'اتصل بي',
      resume: 'السيرة الذاتية',
    },
    graduateStatus: 'خريج علوم الحاسوب',
  }
};

const AnimatedTitle = ({ text }) => {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.h1
      className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-text-primary"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: prefersReducedMotion ? {} : { staggerChildren: 0.08 }
        }
      }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2 last:mr-0"
          variants={prefersReducedMotion ? {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          } : {
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
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
    <div {...bind()} className="h-16 relative overflow-hidden my-6 touch-pan-x" aria-live="polite">
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
          className="absolute w-full text-center text-2xl md:text-3xl font-bold text-secondary"
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
      className="relative inline-flex items-center justify-center px-6 py-3 rounded-full font-medium overflow-hidden group transition-transform"
      whileHover={{ 
        scale: 1.03,
        transition: { type: 'spring', stiffness: 300 }
      }}
      whileTap={{ scale: 0.97 }}
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
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      <span className="relative flex items-center gap-2 z-10 text-white text-sm md:text-base">
        <FiDownload className="w-4 h-4 md:w-5 md:h-5" />
        <span>{text}</span>
      </span>
    </motion.button>
  );
};

const AnimatedCard = ({ children }) => (
  <motion.div
    className="p-5 md:p-6 rounded-xl bg-background-card border border-border shadow-lg hover:shadow-xl transition-all"
    whileHover={{ y: -3 }}
    transition={{ type: 'spring', stiffness: 200 }}
    style={{ willChange: 'transform' }}
  >
    {children}
  </motion.div>
);

export default function About() {
  const { language, isDark, toggleTheme, toggleLanguage } = useTheme();
  const currentContent = content[language];
  const isRTL = language === 'AR';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8], { clamp: false });

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = window.innerWidth < 768 ? -60 : -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  }, []);

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

  useGesture(
    {
      onDrag: ({ direction: [_, dy] }) => {
        if (dy > 3) setIsMenuOpen(false);
      }
    },
    { target: menuRef, drag: { axis: 'y' } }
  );

  const EducationSection = () => (
    <AnimatedCard>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <FaUniversity className="w-6 h-6" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-text-primary">
            {currentContent.education.university}
          </h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-secondary/10 text-secondary">
            <FaGraduationCap className="w-5 h-5" />
          </div>
          <p className="text-base md:text-lg text-text-primary">
            {currentContent.education.degree}
          </p>
        </div>
        
        <p className="font-medium text-secondary mt-3">
          {currentContent.education.year}
        </p>
      </div>
    </AnimatedCard>
  );

  return (
    <section 
      id="about" 
      className="relative min-h-screen bg-gradient-to-b from-background to-background/50"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label="About Section"
    >
      <AnimatedBackground />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {currentContent.name}
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-3">
              {Object.entries(currentContent.nav).map(([id, title]) => (
                <NavItem
                  key={id}
                  title={title}
                  isActive={false}
                  onClick={() => id !== 'resume' && scrollTo(id)}
                  href={id === 'resume' ? '/cv-seba-salamah.pdf' : undefined}
                  isRTL={isRTL}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <motion.a
                  href="https://github.com/Seba-00"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="p-1.5 rounded-lg text-text-secondary hover:text-primary transition-colors"
                  aria-label={language === 'EN' ? 'GitHub profile' : 'ملف جيت هب'}
                >
                  <FaGithub className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/seba-salamah-7916742b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="p-1.5 rounded-lg text-text-secondary hover:text-primary transition-colors"
                  aria-label={language === 'EN' ? 'LinkedIn profile' : 'ملف لينكد إن'}
                >
                  <FaLinkedin className="w-4 h-4" />
                </motion.a>

                <div className="h-5 w-px bg-border/20 mx-1" />

                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-text-secondary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <IoLanguage className="w-4 h-4" />
                  <span className="text-xs font-medium">
                    {language === 'EN' ? 'عربي' : 'English'}
                  </span>
                </motion.button>

                <motion.button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-lg text-text-secondary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
                </motion.button>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-1.5 rounded-lg text-text-secondary"
              >
                {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col h-full p-4">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(currentContent.nav).map(([id, title]) => (
                    <button
                      key={id}
                      onClick={() => {
                        if (id === 'resume') {
                          window.open('/cv-seba-salamah.pdf', '_blank');
                        } else {
                          scrollTo(id);
                        }
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left p-3 rounded-lg text-base transition-colors hover:bg-primary/10"
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="relative z-10 pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-10 md:mb-14"
            >
              <AnimatedTitle text={currentContent.title} />
              
              <motion.p 
                className="text-lg max-w-2xl mx-auto text-text-secondary/90 mt-3 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentContent.subtitle}
              </motion.p>
              
              <RotatingFacts facts={currentContent.funFacts} />
            </motion.div>
          </AnimatePresence>

          <div className="grid md:grid-cols-12 gap-6 items-start">
            <motion.div 
              className="md:col-span-7 space-y-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedCard>
                <div className="prose prose-lg text-text-primary">
                  {currentContent.bio.split('. ').map((sentence, index) => (
                    <p key={index} className="leading-relaxed">
                      {sentence}.
                    </p>
                  ))}
                </div>
              </AnimatedCard>

              <div className="space-y-5">
                <EducationSection />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <CVButton 
                    onClick={handleDownloadCV}
                    text={currentContent.downloadCV}
                    ariaLabel={`${currentContent.downloadCV} - ${currentContent.cvSize}`}
                    isDark={isDark}
                  />
                  <p className="text-sm text-text-secondary/80 mt-2">
                    {currentContent.cvSize}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="md:col-span-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden border border-border/20 shadow-lg">
                <Image
                  src="/images/graduate.png"
                  alt={currentContent.altImage}
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                  placeholder="blur"
                  blurDataURL="/images/graduate-blur.jpg"
                  sizes="(max-width: 768px) 90vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}*/