'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../app/context/ThemeContext';
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiGraphql } from 'react-icons/si';

const content = {
  EN: {
    title: "Technical Skills",
    subtitle: "Transforming ideas into reality through code",
    categories: {
      frontend: "Frontend Development",
      backend: "Backend Development",
      database: "Database & Cloud",
    },
    skills: [
      { name: "React", icon: FaReact, level: 90, category: "frontend" },
      { name: "TypeScript", icon: SiTypescript, level: 88, category: "frontend" },
      { name: "Node.js", icon: FaNodeJs, level: 85, category: "backend" },
      { name: "Python", icon: FaPython, level: 80, category: "backend" },
      { name: "GraphQL", icon: SiGraphql, level: 70, category: "backend" },
      { name: "SQL", icon: FaDatabase, level: 75, category: "database" },
      { name: "Docker", icon: FaDocker, level: 65, category: "database" },
      { name: "AWS", icon: FaAws, level: 60, category: "database" },
    ]
  },
  AR: {
    title: "المهارات التقنية",
    subtitle: "تحويل الأفكار إلى واقع من خلال البرمجة",
    categories: {
      frontend: "تطوير واجهات المستخدم",
      backend: "تطوير الخدمات الخلفية",
      database: "قواعد البيانات والسحابة",
    },
    skills: [
      { name: "React", icon: FaReact, level: 90, category: "frontend" },
      { name: "TypeScript", icon: SiTypescript, level: 88, category: "frontend" },
      { name: "Node.js", icon: FaNodeJs, level: 85, category: "backend" },
      { name: "Python", icon: FaPython, level: 80, category: "backend" },
      { name: "GraphQL", icon: SiGraphql, level: 70, category: "backend" },
      { name: "SQL", icon: FaDatabase, level: 75, category: "database" },
      { name: "Docker", icon: FaDocker, level: 65, category: "database" },
      { name: "AWS", icon: FaAws, level: 60, category: "database" },
    ]
  }
};

const SkillCard = ({ skill, theme, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        filter: isSelected ? 'none' : 'grayscale(0.5)'
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="relative p-6 rounded-xl"
      style={{ 
        backgroundColor: `${theme.primary}${isHovered ? '20' : '10'}`,
        border: `1px solid ${theme.primary}${isHovered ? '30' : '20'}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="flex items-center space-x-4">
        <skill.icon 
          className="transition-all duration-300"
          size={32} 
          style={{ 
            color: theme.primary,
            transform: isHovered ? 'scale(1.2)' : 'scale(1)'
          }} 
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>
            {skill.name}
          </h3>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
          </div>
          <div className="mt-1 text-sm" style={{ color: theme.textSecondary }}>
            {skill.level}%
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const { theme, language } = useTheme();
  const currentContent = content[language];
  const isRTL = language === 'AR';
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSkills = selectedCategory === 'all' 
    ? currentContent.skills
    : currentContent.skills.filter(skill => skill.category === selectedCategory);

  return (
    <section 
      id="skills" 
      className="min-h-screen relative overflow-hidden py-20"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0" style={{ backgroundColor: theme.bg }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${theme.textSecondary} 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: theme.text }}>
            {currentContent.title}
          </h1>
          <p className="text-xl font-medium mb-8" style={{ color: theme.textSecondary }}>
            {currentContent.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: selectedCategory === 'all' ? theme.primary : `${theme.primary}20`,
                color: selectedCategory === 'all' ? theme.bg : theme.text
              }}
            >
              All
            </motion.button>
            {Object.entries(currentContent.categories).map(([key, value]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-2 rounded-full transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: selectedCategory === key ? theme.primary : `${theme.primary}20`,
                  color: selectedCategory === key ? theme.bg : theme.text
                }}
              >
                {value}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                theme={theme}
                isSelected={selectedCategory === 'all' || skill.category === selectedCategory}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
