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

const ProjectCard = ({ project, isRTL }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 50,
      duration: 0.8
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative backdrop-blur-sm bg-background-card/30 border border-border rounded-xl shadow-2xl hover:shadow-primary/20 overflow-hidden group"
      whileHover={{ 
        y: -8,
        transition: { type: 'spring', stiffness: 300 }
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transform transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="/images/blur-pattern.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {project.title}
          </h3>
          <div className="flex gap-3">
            <motion.a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt size={20} />
            </motion.a>
          </div>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <Link href={project.detailsLink} className="block">
          <motion.div
            className="flex items-center gap-2 w-fit ml-auto px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            whileHover={{ x: isRTL ? -5 : 5 }}
          >
            <span>{content[isRTL ? 'AR' : 'EN'].viewDetails}</span>
            <FaInfoCircle size={16} />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const { language } = useTheme();
  const currentContent = content[language];
  const isRTL = language === 'AR';
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom top",
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
      className="relative min-h-screen py-24 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <AnimatedBackground intensity={0.3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {currentContent.title}
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 project-grid">
          {currentContent.projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              isRTL={isRTL} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}