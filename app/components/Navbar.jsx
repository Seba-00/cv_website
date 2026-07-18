'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiX, FiMenu } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const CV_PATH = '/SEBA_CV.pdf';

const labels = {
  EN: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
    resume: 'Résumé',
  },
  AR: {
    about: 'نبذة',
    experience: 'الخبرات',
    projects: 'المشاريع',
    skills: 'المهارات',
    contact: 'تواصل',
    resume: 'السيرة الذاتية',
  },
};

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'contact'];

export default function Navbar() {
  const { isDark, toggleTheme, language, toggleLanguage } = useTheme();
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = labels[language];

  const handleScroll = useCallback(() => {
    const pos = window.scrollY + 120;
    let current = '';
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el && pos >= el.offsetTop) current = id;
    }
    setActive(current);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-background/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-baseline gap-2.5"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <span className="font-mark text-2xl leading-none text-accent">صبا</span>
          <span className="hidden font-display text-sm font-semibold tracking-wide text-ink sm:block">
            Saba Salamah
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {SECTIONS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                active === id ? 'font-semibold text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              {nav[id]}
            </button>
          ))}
          <a
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="ms-2 rounded-md border border-line px-3 py-1.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {nav.resume}
          </a>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href="https://github.com/Seba-00"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden rounded-md p-2 text-muted transition-colors hover:text-ink sm:block"
          >
            <FaGithub className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/seba-salamah-7916742b8/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden rounded-md p-2 text-muted transition-colors hover:text-ink sm:block"
          >
            <FaLinkedin className="h-4 w-4" />
          </a>
          <span className="mx-1 hidden h-5 w-px bg-line sm:block" />
          <button
            onClick={toggleLanguage}
            className="rounded-md px-2.5 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            {language === 'EN' ? 'عربي' : 'EN'}
          </button>
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-md p-2 text-muted transition-colors hover:text-ink"
          >
            {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="rounded-md p-2 text-muted md:hidden"
          >
            {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line/70 bg-background md:hidden"
            aria-label="Mobile"
          >
            <div className="wrap flex flex-col py-3">
              {SECTIONS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`rounded-md px-3 py-3 text-start text-base ${
                    active === id ? 'font-semibold text-accent' : 'text-ink'
                  }`}
                >
                  {nav[id]}
                </button>
              ))}
              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-3 text-base text-ink"
                onClick={() => setMenuOpen(false)}
              >
                {nav.resume}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
