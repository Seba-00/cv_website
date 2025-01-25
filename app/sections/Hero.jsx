'use client';

import { useEffect, useRef, useState, useDeferredValue } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiSun, FiMoon, FiX, FiMenu } from 'react-icons/fi';
import { IoLanguage } from 'react-icons/io5';
import { useGesture } from '@use-gesture/react';
import { useTheme } from '../context/ThemeContext';
import { AnimatedBackground } from '../components/AnimatedBackground';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import Link from 'next/link';

// Loading Spinner Component
const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-50 bg-background flex items-center justify-center"
  >
    <div className="relative w-24 h-24">
      <motion.div
        className="absolute w-full h-full border-4 border-primary/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-full h-full border-4 border-t-transparent border-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  </motion.div>
);

// Throttle function for scroll events
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// Content and translations
const content = {
  EN: {
    greeting: "Hello, I'm",
    name: 'Seba',
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
};

// NavItem component
const NavItem = ({ title, active, onClick, href, isRTL }) => (
  <motion.div
    className="relative px-4 py-2 group font-medium"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {href ? (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative z-10 transition-colors duration-300 ${
          active ? 'text-primary font-semibold' : 'text-text-secondary hover:text-primary'
        }`}
        aria-current={active ? 'page' : undefined}
      >
        {title}
      </Link>
    ) : (
      <button
        onClick={onClick}
        className={`relative z-10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          active ? 'text-primary font-semibold' : 'text-text-secondary hover:text-primary'
        }`}
        aria-current={active ? 'page' : undefined}
      >
        {title}
      </button>
    )}
    {active && !href && (
      <motion.div
        layoutId="navIndicator"
        className="absolute bottom-0 left-1/2 w-4/5 h-1 -translate-x-1/2 rounded-full bg-primary"
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      />
    )}
  </motion.div>
);

const Hero = () => {
  const { isDark, toggleTheme, language, toggleLanguage } = useTheme();
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState('home');
  const currentContent = content[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const deferredRoleIndex = useDeferredValue(currentRoleIndex);
  const heroRef = useRef(null);
  const menuRef = useRef(null);
  const isRTL = language === 'AR';
  const [isLoading, setIsLoading] = useState(true);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Language and accessibility setup
  useEffect(() => {
    document.documentElement.lang = language === 'EN' ? 'en' : 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  // Role rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % currentContent.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentContent.roles.length]);

  // Scroll handler with throttling
  useEffect(() => {
    const handleScroll = () => {
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
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Swipe to close menu
  useGesture(
    {
      onDrag: ({ direction: [_, dy] }) => {
        if (dy > 3) setIsMenuOpen(false);
      }
    },
    { target: menuRef, drag: { axis: 'y' } }
  );

  // Theme toggle without confetti
  const handleThemeToggle = () => {
    toggleTheme();
  };

  // Scroll to section
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Particles initialization
  const particlesInit = async (engine) => await loadFull(engine);

  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);

  return (
    <div id="home" ref={heroRef} className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingSpinner />}
      </AnimatePresence>

      {/* Animated Particles */}
      <Particles
        id="hero-particles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 30 },
            color: { value: isDark ? '#58BCFB' : '#3A8679' },
            opacity: { value: 0.5 },
            size: { value: 1 },
            move: { enable: true, speed: 1.5, direction: 'bottom', straight: false }
          }
        }}
        className="absolute inset-0 z-0"
      />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20"
        style={{ opacity: navOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              className="flex items-center space-x-4 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollTo('home')}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {currentContent.name}
              </span>
              <span className="hidden sm:block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                {currentContent.graduateStatus}
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {Object.entries(currentContent.nav).map(([id, title]) => (
                <NavItem
                  key={id}
                  title={title}
                  active={activeSection === id}
                  onClick={() => id !== 'resume' && scrollTo(id)}
                  href={id === 'resume' ? '/cv-seba-salamah.pdf' : undefined}
                  isRTL={isRTL}
                />
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <motion.a
                  href="https://github.com/Seba-00"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="p-2 rounded-lg text-text-secondary hover:text-primary dark:hover:text-secondary"
                >
                  <FaGithub className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/seba-salamah-7916742b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="p-2 rounded-lg text-text-secondary hover:text-primary dark:hover:text-secondary"
                >
                  <FaLinkedin className="w-5 h-5" />
                </motion.a>
              </div>

              <div className="h-6 w-px bg-border/20" />

              <div className="flex items-center gap-3">
                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-text-secondary hover:text-primary dark:hover:text-secondary"
                  whileHover={{ scale: 1.05 }}
                >
                  <IoLanguage className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {language === 'EN' ? 'عربي' : 'English'}
                  </span>
                </motion.button>

                <motion.button
                  onClick={handleThemeToggle}
                  className="p-2 rounded-lg text-text-secondary hover:text-primary dark:hover:text-secondary"
                  whileHover={{ scale: 1.05 }}
                >
                  {isDark ? (
                    <FiSun className="w-5 h-5" />
                  ) : (
                    <FiMoon className="w-5 h-5" />
                  )}
                </motion.button>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-text-secondary"
              >
                {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              className="md:hidden fixed inset-0 z-50 bg-background-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4 flex-1">
                  {Object.entries(currentContent.nav).map(([id, title]) => (
                    id === 'resume' ? (
                      <Link
                        key={id}
                        href="/cv-seba-salamah.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full text-left p-4 rounded-xl text-lg ${
                          activeSection === id
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {title}
                      </Link>
                    ) : (
                      <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={`w-full text-left p-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                          activeSection === id
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {title}
                      </button>
                    )
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl space-y-8"
        >
          <motion.div
            className="font-mono text-lg md:text-xl text-primary"
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
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {currentContent.name}
            </span>
          </motion.h1>

          <div className="h-20 flex items-center justify-center">
            <AnimatePresence mode='wait'>
              <motion.div
                key={deferredRoleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-2xl md:text-3xl font-medium text-text-secondary"
                transition={{ duration: 0.3 }}
              >
                {currentContent.roles[deferredRoleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
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
  className="relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-primary to-secondary btn-gradient-animate"  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <motion.div
    className="absolute inset-0"
    initial={{
      background: `linear-gradient(90deg, var(--color-primary), var(--color-secondary))`
    }}
    animate={{
      background: [
        `linear-gradient(90deg, var(--color-primary), var(--color-secondary))`,
        `linear-gradient(90deg, var(--color-secondary), var(--color-primary))`
      ]
    }}
    transition={{
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'mirror'
    }}
    whileHover={{
      background: `linear-gradient(90deg, var(--color-secondary), var(--color-primary))`,
      transition: { duration: 0.3 }
    }}
  />
  
  <span className="relative z-10">{currentContent.projectButton}</span>
</motion.button>
              
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;