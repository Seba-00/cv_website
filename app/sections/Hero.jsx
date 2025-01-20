'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { IoLanguage } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';
import { AnimatedBackground } from '../components/AnimatedBackground';

const content = {
  EN: {
    greeting: "Hello, I'm",
    name: 'Seba',
    subtitle: 'Crafting digital experiences with code ✨',
    roles: [
      'Full Stack Developer',
      'UI/UX Enthusiast',
      'Problem Solver',
      'Tech Explorer',
    ],
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    },
    projectButton: 'See My Projects',
    graduateStatus: 'Computer Science Graduate',
  },
  AR: {
    greeting: 'مرحباً، أنا',
    name: 'صبا',
    subtitle: 'أصنع تجارب رقمية بالكود ✨',
    roles: [
      'مطور ويب شامل',
      'مصمم واجهات',
      'حلال مشاكل',
      'مستكشف تقني',
    ],
    nav: {
      home: 'الرئيسية',
      about: 'نبذة عني',
      skills: 'المهارات',
      projects: 'المشاريع',
      contact: 'اتصل بي',
    },
    projectButton: 'شاهد مشاريعي',
    graduateStatus: 'خريج علوم الحاسوب',
  },
};

const NavItem = ({ title, active, onClick, theme }) => (
  <motion.button
    onClick={onClick}
    className="relative px-4 py-2 group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.span
      className="relative z-10 text-lg transition-colors duration-300"
      style={{
        color: active ? theme.primary : theme.textSecondary,
      }}
    >
      {title}
    </motion.span>
    {active && (
      <motion.div
        layoutId="navIndicator"
        className="absolute inset-0 rounded-md"
        style={{ backgroundColor: `${theme.primary}20` }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      />
    )}
  </motion.button>
);

export default function Hero() {
  const { isDark, toggleTheme, theme, language, toggleLanguage } = useTheme();
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState('home');
  const currentContent = content[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const heroRef = useRef(null);

  const navItems = Object.entries(currentContent.nav).map(([id, title]) => ({
    id,
    title,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % currentContent.roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentContent.roles.length]);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);

  const navBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(10px)']);

  return (
    <div id="home" ref={heroRef} className="relative min-h-screen overflow-hidden">
      <AnimatedBackground theme={theme} scrollMultiplier={1} />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: theme.navBg,
          opacity: navOpacity,
          backdropFilter: navBlur,
          borderBottom: `1px solid ${theme.borderColor}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  title={item.title}
                  active={activeSection === item.id}
                  onClick={() => scrollTo(item.id)}
                  theme={theme}
                />
              ))}
            </div>

            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-6 h-0.5 mb-1.5" style={{ backgroundColor: theme.primary }} />
                <div className="w-6 h-0.5 mb-1.5" style={{ backgroundColor: theme.primary }} />
                <div className="w-6 h-0.5" style={{ backgroundColor: theme.primary }} />
              </motion.button>
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com/Seba-00"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ color: theme.primary }}
              >
                <FaGithub className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/seba-salamah-7916742b8/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ color: theme.primary }}
              >
                <FaLinkedin className="w-5 h-5" />
              </motion.a>

              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  background: `${theme.primary}15`,
                  color: theme.primary,
                }}
              >
                <IoLanguage className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === 'EN' ? 'عربي' : 'English'}
                </span>
              </motion.button>

              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg"
                style={{ color: theme.primary }}
              >
                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute w-full"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: theme.navBg }}
            >
              <div className="px-6 py-4 space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="w-full text-left px-4 py-2 rounded-lg"
                    whileHover={{ x: 8 }}
                    style={{
                      backgroundColor:
                        activeSection === item.id ? `${theme.primary}15` : 'transparent',
                      color:
                        activeSection === item.id ? theme.primary : theme.textSecondary,
                    }}
                  >
                    {item.title}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-lg"
            style={{ color: theme.primary }}
          >
            {currentContent.greeting}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
            style={{
              color: theme.text,
              fontFamily: 'Montserrat, sans-serif', // Apply the font here
            }}
          >
            {currentContent.name}
          </motion.h1>

          <motion.div
            key={currentRoleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-16 text-3xl md:text-4xl font-bold"
            style={{ color: theme.secondary }}
          >
            {currentContent.roles[currentRoleIndex]}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl max-w-2xl mx-auto"
            style={{ color: theme.textSecondary }}
          >
            {currentContent.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-semibold"
            style={{ color: theme.textSecondary }}
          >
            {currentContent.graduateStatus}
          </motion.p>

          <motion.button
            onClick={() => scrollTo('projects')}
            className="px-8 py-4 rounded-xl font-medium shadow-lg"
            style={{
              backgroundColor: theme.primary,
              color: isDark ? theme.bg.split('-')[0].replace('from-', '') : theme.text,
              boxShadow: `0 10px 15px -3px ${theme.shadowColor}`,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 20px 25px -5px ${theme.shadowColor}`,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {currentContent.projectButton}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
