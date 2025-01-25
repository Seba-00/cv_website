'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '../../app/context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import { AnimatedBackground } from '../components/AnimatedBackground';

const content = {
  EN: {
    title: "Projects",
    viewDetails: "View Details",
    projects: [
      {
        title: "Eye Disease Analysis System ",
        description: "Advanced AI-powered eye disease detection, segmentation, and classification system",
        image: "/images/EYE.png",
        github: "https://github.com/yourusername/ecommerce-platform",
        live: "https://ecommerce-platform-demo.com",
        tags: [ "Python", "google colab", "Computer vision"],
        detailsLink: "/projects/project1" 
      },
      {
        title: "Geovision Explorer",
        description: "A responsive task management application with real-time updates.",
        image: "/images/geoo.png",
        github: "https://github.com/yourusername/task-management-app",
        live: "https://task-app-demo.com",
        tags: ["Flutter", "Firebase", "Computer vision" ],
        detailsLink: "/projects/project2"
      },
      {
        title: "Weather Forecast Dashboard",
        description: "An interactive weather dashboard using OpenWeatherMap API.",
        image: "/images/project3.jpg",
        github: "https://github.com/yourusername/weather-dashboard",
        live: "https://weather-dashboard-demo.com",
        tags: ["JavaScript", "API Integration", "Chart.js"],
        detailsLink: "/projects/project3"
      }
    ]
  },
  AR: {
    title: "المشاريع",
    viewDetails: "عرض التفاصيل",
    projects: [
      {
        title: "منصة التجارة الإلكترونية",
        description: "حل متكامل للتجارة الإلكترونية باستخدام React و Node.js و MongoDB.",
        image: "/images/project1.jpg",
        github: "https://github.com/yourusername/ecommerce-platform",
        live: "https://ecommerce-platform-demo.com",
        tags: ["React", "Node.js", "MongoDB", "Express"],
        detailsLink: "/projects/project1"
      },
      {
        title: "تطبيق إدارة المهام",
        description: "تطبيق إدارة مهام متجاوب مع تحديثات في الوقت الفعلي.",
        image: "/images/project2.jpg",
        github: "https://github.com/yourusername/task-management-app",
        live: "https://task-app-demo.com",
        tags: ["React", "Firebase", "Material-UI"],
        detailsLink: "/projects/project2"
      },
      {
        title: "لوحة تحكم توقعات الطقس",
        description: "لوحة تحكم تفاعلية للطقس باستخدام واجهة برمجة تطبيقات OpenWeatherMap.",
        image: "/images/project3.jpg",
        github: "https://github.com/yourusername/weather-dashboard",
        live: "https://weather-dashboard-demo.com",
        tags: ["JavaScript", "تكامل API", "Chart.js"],
        detailsLink: "/projects/project3"
      }
    ]
  }
};

const ProjectCard = ({ project, theme, isRTL }) => (
  <motion.div
    className="backdrop-blur-sm bg-opacity-50 rounded-lg shadow-lg overflow-hidden"
    style={{ 
      backgroundColor: `${theme.primary}05`,
      border: `1px solid ${theme.primary}20`,
    }}
    whileHover={{ 
      y: -5, 
      backgroundColor: theme.cardBg,
      boxShadow: `0 25px 50px -12px ${theme.primary}30` 
    }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative h-48">
      <Image
        src={project.image}
        alt={project.title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2" style={{ color: theme.primary }}>{project.title}</h3>
      <p className="text-sm mb-4" style={{ color: theme.textSecondary }}>{project.description}</p>
      <div className="flex flex-wrap mb-4">
        {project.tags.map((tag, index) => (
          <span 
            key={index}
            className="text-xs mr-2 mb-2 px-2 py-1 rounded-full"
            style={{ 
              backgroundColor: `${theme.primary}20`,
              color: theme.primary
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-center justify-between`}>
        <div className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
          <motion.a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{ color: theme.primary }}
          >
            <FaGithub size={20} />
          </motion.a>
          <motion.a 
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{ color: theme.primary }}
          >
            <FaExternalLinkAlt size={20} />
          </motion.a>
        </div>
        <Link href={project.detailsLink}>
          <motion.button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg"
            style={{ 
              backgroundColor: `${theme.primary}15`,
              color: theme.primary
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaInfoCircle size={16} />
            <span>{content[isRTL ? 'AR' : 'EN'].viewDetails}</span>
          </motion.button>
        </Link>
      </div>
    </div>
  </motion.div>
);

export default function Projects() {
  const { theme, language } = useTheme();
  const currentContent = content[language];
  const isRTL = language === 'AR';
  
  const sectionRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(projectsRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <AnimatedBackground theme={theme} scrollMultiplier={0.7} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          style={{ color: theme.text }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {currentContent.title}
        </motion.h2>

        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              theme={theme} 
              isRTL={isRTL} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}