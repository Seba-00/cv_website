// app/context/ThemeContext.js
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');

    // Set theme
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }

    // Set language
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Update DOM when theme changes
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'EN' ? 'AR' : 'EN';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.dir = newLanguage === 'AR' ? 'rtl' : 'ltr';
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, language, toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}