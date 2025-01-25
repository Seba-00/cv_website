'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../app/context/ThemeContext';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDatabase, 
  FaDocker, 
  FaAws,
  FaPaintBrush,
  FaServer,
  FaCloud
} from 'react-icons/fa';
import { SiTypescript, SiGraphql } from 'react-icons/si';
import { AnimatedBackground } from '../components/AnimatedBackground';

const content = {
  EN: {
    title: "Technical Expertise",
    subtitle: "Transforming concepts into digital solutions",
    categories: {
      frontend: "Frontend Development",
      backend: "Backend Architecture",
      database: "Cloud & Infrastructure",
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
    subtitle: "تحويل الأفكار إلى حلول رقمية",
    categories: {
      frontend: "تطوير الواجهات",
      backend: "هندسة الخلفية",
      database: "البنية التحتية والسحابة",
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

const RadialProgress = ({ percentage }) => {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="transform -rotate-90 w-24 h-24">
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-primary/20"
        />
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary transition-all duration-1000"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-primary">
        {percentage}%
      </span>
    </div>
  );
};

const SkillCard = ({ skill, isSelected }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl bg-background-card border border-border hover:border-primary/50 shadow-lg hover:shadow-xl transition-all"
      whileHover={{ y: -5 }}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl text-primary">
          <skill.icon />
        </div>
        <h3 className="text-xl font-semibold text-text-primary">
          {skill.name}
        </h3>
        <RadialProgress percentage={skill.level} />
        <span className="text-sm text-text-secondary">
          {content.EN.categories[skill.category]}
        </span>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const { language } = useTheme();
  const currentContent = content[language];
  const isRTL = language === 'AR';
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryIcons = {
    frontend: FaPaintBrush,
    backend: FaServer,
    database: FaCloud
  };

  const filteredSkills = selectedCategory === 'all' 
    ? currentContent.skills
    : currentContent.skills.filter(skill => skill.category === selectedCategory);

  return (
    <section 
      id="skills" 
      className="min-h-screen relative py-20"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <AnimatedBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {currentContent.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentContent.subtitle}
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {['all', ...Object.keys(currentContent.categories)].map((category) => {
            const Icon = category === 'all' ? null : categoryIcons[category];
            return (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category === 'all' ? 'all' : category)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category 
                    ? 'bg-primary text-background shadow-lg' 
                    : 'bg-background-card text-text-primary hover:bg-primary/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {Icon && <Icon className="w-5 h-5" />}
                {category === 'all' 
                  ? language === 'EN' ? 'All' : 'الكل'
                  : currentContent.categories[category]}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                isSelected={selectedCategory === 'all' || skill.category === selectedCategory}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}