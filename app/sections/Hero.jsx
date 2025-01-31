/*'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiSun, FiMoon, FiX, FiMenu } from 'react-icons/fi';
import { IoLanguage } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const AnimatedBackground = dynamic(
  () => import('../components/AnimatedBackground').then(mod => mod.AnimatedBackground),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background" />
  }
);

const NavItem = React.memo(({ title, active, onClick, isRTL, href }) => (
  <motion.div
    className="relative px-4 py-2 group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative z-10 transition-colors duration-300 text-base font-semibold ${
          active ? 'text-primary' : 'text-text-secondary hover:text-primary'
        }`}
        aria-label={`Open ${title}`}
      >
        {title}
      </a>
    ) : (
      <button
        onClick={onClick}
        className={`relative z-10 transition-colors duration-300 text-base font-semibold ${
          active ? 'text-primary' : 'text-text-secondary hover:text-primary'
        }`}
        aria-current={active ? 'page' : undefined}
      >
        {title}
      </button>
    )}
    {active && !href && (
      <motion.div
        layoutId="navIndicator"
        className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full"
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      />
    )}
  </motion.div>
));

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const { isDark, toggleTheme, language, toggleLanguage } = useTheme();
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const heroRef = useRef(null);
  const isRTL = language === 'AR';

  const content = React.useMemo(() => ({
    EN: {
      greeting: "Hello, I'm",
      name: 'SEBA',
      subtitle: 'Crafting digital experiences with code ✨',
      roles: ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Tech Explorer'],
      nav: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact',
        resume: 'Resume',
      },
      projectButton: 'See My Projects',
      graduateStatus: 'Computer Science Graduate',
    },
    AR: {
      greeting: 'مرحباً، أنا',
      name: 'صبا',
      subtitle: 'أصنع تجارب رقمية بالكود ✨',
      roles: ['مطور ويب شامل', 'مصمم واجهات', 'حلال مشاكل', 'مستكشف تقني'],
      nav: {
        home: 'الرئيسية',
        about: 'نبذة عني',
        skills: 'المهارات',
        projects: 'المشاريع',
        contact: 'اتصل بي',
        resume: 'السيرة الذاتية',
      },
      projectButton: 'شاهد مشاريعي',
      graduateStatus: 'خريج علوم الحاسوب',
    },
  }), []);

  const currentContent = content[language];
  const navItems = React.useMemo(() =>
    Object.entries(currentContent.nav).map(([id, title]) => ({ id, title })),
    [currentContent.nav]
  );

  const handleScroll = useCallback(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const currentPos = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (currentPos >= offsetTop && currentPos < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex(prev => (prev + 1) % currentContent.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentContent.roles.length]);

  useEffect(() => {
    if (!isMounted) return;

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isMounted, handleScroll]);

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div id="home" ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background/90 to-background/50">
      <AnimatedBackground />

      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <Link 
              href="#home" 
              scroll={false} 
              className="flex items-center cursor-pointer"
              onClick={() => scrollTo('home')}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4"
              >
                <motion.h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SEBA
                </motion.h1>
                <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-primary/15 text-primary">
                  {currentContent.graduateStatus}
                </span>
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              {navItems.map(item => (
                <NavItem
                  key={item.id}
                  title={item.title}
                  active={activeSection === item.id}
                  onClick={() => item.id !== 'resume' && scrollTo(item.id)}
                  href={item.id === 'resume' ? '/cv-seba-salamah.pdf' : undefined}
                  isRTL={isRTL}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <motion.a
                  href="https://github.com/Seba-00"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="p-2 rounded-lg text-text-secondary hover:text-primary transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/seba-salamah-7916742b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="p-2 rounded-lg text-text-secondary hover:text-primary transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                </motion.a>
              </div>

              <div className="h-6 w-px bg-border/30" />

              <motion.button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-text-secondary hover:text-primary transition-colors text-base"
                whileHover={{ scale: 1.05 }}
              >
                <IoLanguage className="w-5 h-5" />
                <span className="font-medium">
                  {language === 'EN' ? 'عربي' : 'English'}
                </span>
              </motion.button>

              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-text-secondary hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </motion.button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-text-secondary"
              >
                {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 z-50 bg-background/98 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-3">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'resume') {
                          window.open('/cv-seba-salamah.pdf', '_blank');
                        } else {
                          scrollTo(item.id);
                        }
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left p-4 rounded-lg text-lg font-medium ${
                        activeSection === item.id
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl space-y-8"
        >
          <motion.div
            className="font-mono text-lg sm:text-xl text-primary/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentContent.greeting}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              {currentContent.name}
            </span>
          </motion.h1>

          <div className="h-20 flex items-center justify-center">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-2xl sm:text-3xl font-medium text-text-secondary"
                transition={{ duration: 0.3 }}
              >
                {currentContent.roles[currentRoleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            className="text-lg sm:text-xl text-text-secondary/90 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentContent.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <motion.button
              onClick={() => scrollTo('projects')}
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-primary to-secondary transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{currentContent.projectButton}</span>
              <div className="absolute inset-0 rounded-lg bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Throttle utility function
  function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }*/
  

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiSun, FiMoon, FiX, FiMenu } from 'react-icons/fi';
import { IoLanguage } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const AnimatedBackground = dynamic(
  () => import('../components/AnimatedBackground').then(mod => mod.AnimatedBackground),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background" />
  }
);

const NavItem = React.memo(({ title, active, onClick, isRTL, href }) => (
  <motion.div
    className="relative px-3 py-2 group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative z-10 transition-colors duration-300 text-sm font-medium ${
          active ? 'text-primary' : 'text-text-secondary hover:text-primary'
        }`}
        aria-label={`Open ${title}`}
      >
        {title}
      </a>
    ) : (
      <button
        onClick={onClick}
        className={`relative z-10 transition-colors duration-300 text-sm font-medium ${
          active ? 'text-primary' : 'text-text-secondary hover:text-primary'
        }`}
        aria-current={active ? 'page' : undefined}
      >
        {title}
      </button>
    )}
    {active && !href && (
      <motion.div
        layoutId="navIndicator"
        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      />
    )}
  </motion.div>
));

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const { isDark, toggleTheme, language, toggleLanguage } = useTheme();
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const heroRef = useRef(null);
  const isRTL = language === 'AR';

  // Memoized content to prevent unnecessary recalculations
  const content = React.useMemo(() => ({
    EN: {
      greeting: "Hello, I'm",
      name: 'SEBA',
      subtitle: 'Crafting digital experiences with code ✨',
      roles: ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Tech Explorer'],
      nav: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact',
        resume: 'Resume',
      },
      projectButton: 'See My Projects',
      graduateStatus: 'Computer Science Graduate',
    },
    AR: {
      greeting: 'مرحباً، أنا',
      name: 'صبا',
      subtitle: 'أصنع تجارب رقمية بالكود ✨',
      roles: ['مطور ويب شامل', 'مصمم واجهات', 'حلال مشاكل', 'مستكشف تقني'],
      nav: {
        home: 'الرئيسية',
        about: 'نبذة عني',
        skills: 'المهارات',
        projects: 'المشاريع',
        contact: 'اتصل بي',
        resume: 'السيرة الذاتية',
      },
      projectButton: 'شاهد مشاريعي',
      graduateStatus: 'خريج علوم الحاسوب',
    },
  }), []);

  const currentContent = content[language];
  const navItems = React.useMemo(() =>
    Object.entries(currentContent.nav).map(([id, title]) => ({ id, title })),
    [currentContent.nav]
  );

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const currentPos = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (currentPos >= offsetTop && currentPos < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex(prev => (prev + 1) % currentContent.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentContent.roles.length]);

  useEffect(() => {
    if (!isMounted) return;

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isMounted, handleScroll]);

  // Optimized scroll function
  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  }, []);

  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);

  if (!isMounted) {
    return null;
  }

  return (
    <div id="home" ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-background/50">
      <AnimatedBackground />
  
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/90 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="#home" 
              scroll={false} 
              className="flex items-center cursor-pointer"
              onClick={() => scrollTo('home')}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <motion.h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SEBA
                </motion.h1>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {currentContent.graduateStatus}
                </span>
              </motion.div>
            </Link>
  
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map(item => (
                <NavItem
                  key={item.id}
                  title={item.title}
                  active={activeSection === item.id}
                  onClick={() => item.id !== 'resume' && scrollTo(item.id)}
                  href={item.id === 'resume' ? '/cv-seba-salamah.pdf' : undefined}
                  isRTL={isRTL}
                />
              ))}
            </div>
  
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <motion.a
                  href="https://github.com/Seba-00"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="p-1.5 rounded-lg text-text-secondary hover:text-primary transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                </motion.a>
  
                <motion.a
                  href="https://www.linkedin.com/in/seba-salamah-7916742b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="p-1.5 rounded-lg text-text-secondary hover:text-primary transition-colors"
                >
                  <FaLinkedin className="w-4 h-4" />
                </motion.a>
              </div>
  
              <div className="h-5 w-px bg-border/20" />
  
              <motion.button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-text-secondary hover:text-primary transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <IoLanguage className="w-4 h-4" />
                <span className="font-medium">
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
              className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col h-full p-4">
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'resume') {
                          window.open('/cv-seba-salamah.pdf', '_blank');
                        } else {
                          scrollTo(item.id);
                        }
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg text-base ${
                        activeSection === item.id
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
  
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6"
        >
          <motion.div
            className="font-mono text-base sm:text-lg text-primary/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentContent.greeting}
          </motion.div>
  
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {currentContent.name}
            </span>
          </motion.h1>
  
          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl sm:text-2xl font-medium text-text-secondary"
                transition={{ duration: 0.3 }}
              >
                {currentContent.roles[currentRoleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
  
          <motion.p
            className="text-base sm:text-lg text-text-secondary/90 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentContent.subtitle}
          </motion.p>
  
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={() => scrollTo('projects')}
              className="group relative inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-primary to-secondary transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{currentContent.projectButton}</span>
              <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


// Throttle utility function
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function(...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

