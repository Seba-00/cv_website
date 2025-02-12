'use client';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

export const AnimatedBackground = () => {
  const { isDark } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
  }, []);

  if (!isMounted) return null;

  // If user prefers reduced motion or screen is small, render simple background
  if (isReducedMotion || (typeof window !== 'undefined' && window.innerWidth < 1024)) {
    return (
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: isDark ? 'rgb(22, 28, 45)' : 'rgb(245, 245, 247)',
          opacity: 0.8
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: isDark 
              ? 'linear-gradient(135deg, rgba(102, 178, 255, 0.1), rgba(255, 110, 127, 0.1))'
              : 'linear-gradient(135deg, rgba(41, 128, 185, 0.1), rgba(52, 152, 219, 0.1))'
          }}
        />
      </div>
    );
  }

  // For desktop, render minimal animated version
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        backgroundColor: isDark ? 'rgb(22, 28, 45)' : 'rgb(245, 245, 247)',
        opacity: 0.8
      }}
    >
      <div 
        className="absolute inset-0 animate-gradient"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(102, 178, 255, 0.1), rgba(255, 110, 127, 0.1))'
            : 'linear-gradient(135deg, rgba(41, 128, 185, 0.1), rgba(52, 152, 219, 0.1))',
          backgroundSize: '400% 400%'
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(102, 178, 255, 0.15) 0%, transparent 60%)'
            : 'radial-gradient(circle at 50% 50%, rgba(41, 128, 185, 0.15) 0%, transparent 60%)'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;