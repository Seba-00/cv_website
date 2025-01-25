'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';


const themes = {
  light: {
    bg: 'from-[#f8f5f0] via-[#f2efe9] to-[#f8f5f0]', // Updated light background gradient
    text: '#34495e', // Dark Grayish Blue
    textSecondary: '#7f8c8d', // Grayish Blue
    primary: '#272640', // Coral Red
    secondary: '#bb8588', // Bright Blue
    accent: '#ffca28',
    navBg: 'rgba(255, 255, 255, 0.9)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    borderColor: 'rgba(144, 238, 144, 0.2)',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    bg: 'from-gray-900 to-gray-800',
    text: '#f8f9fa',
    textSecondary: '#adb5bd',
    primary: '#17a2b8',
    secondary: '#28a745',
    accent: '#ffc107',
    navBg: 'rgba(33, 37, 41, 0.9)',
    cardBg: 'rgba(52, 58, 64, 0.95)',
    borderColor: 'rgba(23, 162, 184, 0.2)',
    shadowColor: 'rgba(255, 255, 255, 0.1)',
  },
};


const ThemeContext = createContext();


export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [theme, setTheme] = useState(themes.light);


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');


    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      setTheme(themes[savedTheme]);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      setTheme(prefersDark ? themes.dark : themes.light);
    }


    if (savedLanguage) {
      setLanguage(savedLanguage);
    }


    document.documentElement.classList.toggle('dark', isDark);
  }, []);


  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setTheme(newIsDark ? themes.dark : themes.light);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newIsDark);
  };


  const toggleLanguage = () => {
    const newLanguage = language === 'EN' ? 'AR' : 'EN';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.dir = newLanguage === 'AR' ? 'rtl' : 'ltr';
  };


  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme, language, toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}


export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}