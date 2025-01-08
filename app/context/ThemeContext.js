// app/context/ThemeContext.js

'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  light: {
    bg: 'from-white to-gray-50',
    text: '#1a1a1a',
    textSecondary: '#666666',
    primary: '#3b82f6',
    secondary: '#da627d',
    navBg: 'rgba(255, 255, 255, 0.8)',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(59, 130, 246, 0.2)'
  },
  dark: {
    bg: 'from-gray-900 to-black',
    text: '#ffffff',
    textSecondary: '#a3a3a3',
    primary: '#60a5fa',
    secondary: '#34d399',
    navBg: 'rgba(0, 0, 0, 0.8)',
    cardBg: 'rgba(17, 17, 17, 0.9)',
    borderColor: 'rgba(96, 165, 250, 0.2)'
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [theme, setTheme] = useState(themes.light);

  useEffect(() => {
    // Check local storage for saved preferences
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      setTheme(themes[savedTheme]);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      setTheme(prefersDark ? themes.dark : themes.light);
    }

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Apply theme to document
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