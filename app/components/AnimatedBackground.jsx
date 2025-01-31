'use client';

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState, useMemo } from 'react';

export const AnimatedBackground = () => {
  const { isDark } = useTheme();
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const [isMounted, setIsMounted] = useState(false);


  const scrollOpacity = useTransform(
    scrollY,
    [0, typeof window !== 'undefined' ? window.innerHeight * 2 : 600],
    isDark ? [0.6, 0.2] : [0.4, 0.2]
  );

  const smoothX = useTransform(mouseX, x => x);
  const smoothY = useTransform(mouseY, y => y);

  const gradientTransform = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(
      circle at ${x}% ${y}%,
      rgba(var(--color-primary), 0.08) 0%,
      rgba(var(--color-secondary), 0.04) 20%,
      transparent 40%
    )`
  );

  // Define glow circles with different colors for each theme
  const glowCircles = useMemo(() => [
    {
      x: 20,
      y: 15,
      size: 500,
      lightColor: 'rgba(96, 125, 139, 0.15)', // Primary light theme
      darkColor: 'rgba(102, 178, 255, 0.15)'  // Primary dark theme
    },
    {
      x: 80,
      y: 25,
      size: 450,
      lightColor: 'rgba(38, 198, 218, 0.15)', // Secondary light theme
      darkColor: 'rgba(255, 110, 127, 0.15)'  // Secondary dark theme
    },
    {
      x: 30,
      y: 70,
      size: 600,
      lightColor: 'rgba(96, 125, 139, 0.12)', // Primary light theme variant
      darkColor: 'rgba(102, 178, 255, 0.12)'  // Primary dark theme variant
    },
    {
      x: 75,
      y: 85,
      size: 500,
      lightColor: 'rgba(38, 198, 218, 0.12)', // Secondary light theme variant
      darkColor: 'rgba(255, 110, 127, 0.12)'  // Secondary dark theme variant
    }
  ], []);

  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      scale: Math.random() * 0.3 + 0.2,
    }));
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set((clientX / window.innerWidth) * 100);
      mouseY.set((clientY / window.innerHeight) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);


  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background/40"
      style={{ opacity: scrollOpacity }}
    >
      {/* Glow circles */}
      {glowCircles.map((circle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            width: circle.size,
            height: circle.size,
            backgroundColor: isDark ? circle.darkColor : circle.lightColor,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: index * 1.2,
          }}
        />
      ))}

      {/* Base gradient with animated transition */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(45deg, rgba(var(--color-primary), 0.03) 0%, transparent 100%)`,
            `linear-gradient(135deg, rgba(var(--color-secondary), 0.04) 0%, transparent 100%)`
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
        className="absolute inset-0 opacity-20"
        style={{
          background: gradientTransform,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Floating particles */}
      {particles.map(({ id, initialX, initialY, scale }) => (
        <motion.div
          key={id}
          className="absolute w-1 h-1 rounded-full bg-primary/5"
          initial={{ x: `${initialX}%`, y: `${initialY}%`, scale }}
          animate={{
            x: [`${initialX}%`, `${initialX + (Math.random() * 8 - 4)}%`],
            y: [`${initialY}%`, `${initialY + (Math.random() * 8 - 4)}%`],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid pattern with reduced opacity */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}
      />
    </motion.div>
  );
};

export default AnimatedBackground;
