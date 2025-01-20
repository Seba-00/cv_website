'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  light: {
    bg: '#f8f9fa', // Very light gray, almost white
    text: '#212529', // Dark gray, almost black
    textSecondary: '#6c757d', // Medium gray
    primary: '#1e88e5', // A slightly darker, more sophisticated blue
    secondary: '#4caf50', // A slightly muted green
    accent: '#ffca28', // A slightly muted yellow
    navBg: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
    cardBg: 'rgba(255, 255, 255, 0.95)', // Slightly less transparent white
    borderColor: 'rgba(30, 136, 229, 0.2)', // Semi-transparent primary blue
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Light shadow
  },
  dark: {
    bg: 'from-gray-900 to-gray-800', // Dark gray to slightly lighter dark gray
    text: '#f8f9fa', // Very light gray, almost white
    textSecondary: '#adb5bd', // Light gray
    primary: '#17a2b8', // A teal blue
    secondary: '#28a745', // A vibrant green
    accent: '#ffc107', // A warm yellow
    navBg: 'rgba(33, 37, 41, 0.9)', // Semi-transparent dark gray
    cardBg: 'rgba(52, 58, 64, 0.95)', // Slightly less transparent dark gray
    borderColor: 'rgba(23, 162, 184, 0.2)', // Semi-transparent primary teal
    shadowColor: 'rgba(255, 255, 255, 0.1)', // Light shadow
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