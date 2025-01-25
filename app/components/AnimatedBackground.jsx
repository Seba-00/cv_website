'use client';
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AnimatedBackground = ({ theme, scrollMultiplier = 1 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Modified opacity transform to be less dramatic in light mode
  const opacity = useTransform(
    scrollY,
    [0, 300 * scrollMultiplier],
    // Adjust the final opacity value to be higher in light mode
    theme.bg.includes('from-[#f8f5f0]') ? [1, 0.8] : [1, 0.3]
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      style={{ opacity }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b ${theme.bg} transition-all duration-700`}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${theme.primary}20 0%, transparent 25%)`
          }}
          transition={{ type: "tween", duration: 0.2 }}
        />
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${theme.textSecondary} 1px, transparent 0)`,
              backgroundSize: '40px 40px',
              transition: 'all 0.5s ease-in-out'
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};