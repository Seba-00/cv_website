'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../app/context/ThemeContext';
import { FaGithub, FaInfoCircle } from 'react-icons/fa';
import { AnimatedBackground } from '../components/AnimatedBackground';

const content = {
  EN: {
    title: "Projects",
    subtitle: "Showcasing My Digital Creations",
    viewDetails: "View Details",
    projects: [
      {
        title: "Eye Disease Analysis System",
        description: "Advanced AI-powered eye disease detection, segmentation, and classification system",
        image: "/images/EYE.png",
        github: "https://github.com/yourusername/ecommerce-platform",
        tags: ["Python", "Google Colab", "Computer Vision"],
        detailsLink: "/projects/project1",
      },
      {
        title: "Geovision Explorer",
        description: "A responsive task management application with real-time updates.",
        image: "/images/geoo.png",
        github: "https://github.com/yourusername/task-management-app",
        tags: ["Flutter", "Firebase", "Computer Vision"],
        detailsLink: "/projects/project2",
      },
    ],
  },
  AR: {
    title: "المشاريع",
    subtitle: "عرض إبداعاتي الرقمية",
    viewDetails: "عرض التفاصيل",
    projects: [
      {
        title: "نظام تحليل أمراض العين",
        description: "نظام متقدم للكشف عن أمراض العين والتجزئة والتصنيف مدعوم بالذكاء الاصطناعي",
        image: "/images/EYE.png",
        github: "https://github.com/yourusername/ecommerce-platform",
        tags: ["بايثون", "جوجل كولاب", "رؤية الحاسب"],
        detailsLink: "/projects/project1",
      },
      {
        title: "مستكشف الرؤية الجغرافية",
        description: "تطبيق إدارة مهام متجاوب مع تحديثات في الوقت الفعلي.",
        image: "/images/geoo.png",
        github: "https://github.com/yourusername/task-management-app",
        tags: ["فلاتر", "فايربيس", "رؤية الحاسب"],
        detailsLink: "/projects/project2",
      },
    ],
  },
};

const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

const ProjectCard = ({ project, isRTL, index }) => {
  const { viewDetails } = content[isRTL ? "AR" : "EN"];
  
  return (
    <ScrollReveal delay={index * 0.2}>
      <motion.div
        className="relative h-full backdrop-blur-sm bg-background-card/30 border border-border rounded-xl overflow-hidden group"
        whileHover={{
          y: -10,
          scale: 1.05,
          transition: { type: "spring", stiffness: 300 },
        }}
        style={{ transition: 'transform 0.3s ease-in-out' }}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transform transition-transform duration-500 group-hover:scale-110"
            placeholder="blur"
            blurDataURL="/images/blur-pattern.png"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
        </div>

        <div className="p-6 flex flex-col min-h-[200px]">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-text-primary">
              {project.title}
            </h3>
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
          </div>

          <p className="text-sm text-text-secondary leading-relaxed mt-2">
            {project.description}
          </p>

          <div className="mt-auto pt-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags && project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link href={project.detailsLink}>
              <motion.div
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                whileHover={{ x: isRTL ? -3 : 3 }}
              >
                <span>{viewDetails}</span>
                <FaInfoCircle size={12} />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

export default function Projects() {
  const { language } = useTheme();
  const currentContent = content[language];
  const isRTL = language === "AR";

  return (
    <section
      className="relative min-h-screen py-20"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <AnimatedBackground />

      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                {currentContent.title}
              </h1>
              <p className="text-lg text-text-secondary">
                {currentContent.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {currentContent.projects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                isRTL={isRTL} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
