// components/AnimatedBackground.jsx
'use client';

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useEffect } from 'react';

export const AnimatedBackground = () => {
  const { isDark } = useTheme();
  const { scrollY } = useScroll();
  
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  // Scroll-based opacity with safe window reference
  const scrollOpacity = useTransform(
    scrollY,
    [0, typeof window !== 'undefined' ? window.innerHeight * 2 : 600],
    isDark ? [0.95, 0.2] : [1, 0.5]
  );

  // Smoother gradient movement
  const smoothX = useTransform(mouseX, x => x);
  const smoothY = useTransform(mouseY, y => y);

  const gradientTransform = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(
      circle at ${x}% ${y}%, 
      rgba(var(--color-primary), 0.15) 0%, 
      transparent 40%
    )`
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set((clientX / window.innerWidth) * 100);
      mouseY.set((clientY / window.innerHeight) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity: scrollOpacity }}
    >
      {/* Base gradient with animated transition */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-background-card to-background"
        animate={{
          background: [
            `linear-gradient(45deg, rgba(var(--color-primary), 0.05) 0%, transparent 100%)`,
            `linear-gradient(135deg, rgba(var(--color-primary), 0.08) 0%, transparent 100%)`
          ]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />

      {/* Interactive gradient layer */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: gradientTransform,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Dynamic grid pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Subtle animated noise texture */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <div className="absolute inset-0 noise-pattern" />
      </div>
    </motion.div>
  );
};

// Add this to your global CSS:
// .noise-pattern {
//   background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
// }