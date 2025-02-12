'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';
import { AnimatedBackground } from '../components/AnimatedBackground';

const content = {
  EN: {
    title: "Projects",
   
    viewDetails: "Explore Project",
    projects: [
      {
        title: "Eye Disease Analysis System",
        description: "Advanced AI-powered eye disease detection, segmentation, and classification system",
        image: "/images/EYE.png",
        tags: ["Python", "Google Colab", "Computer Vision"],
        detailsLink: "/projects/project1",
      },
      {
        title: "Geovision Explorer",
        description: "Augmented Reality app transforming geometry education for children",
        image: "/images/geoo.png",
        tags: ["Flutter", "Firebase", "Computer Vision"],
        detailsLink: "/projects/project2",
      },
    ],
  },
  AR: {
    title: "المشاريع",
    
    viewDetails: "استكشف المشروع",
    projects: [
      {
        title: "نظام تحليل أمراض العين",
        description: "نظام متقدم للكشف عن أمراض العين باستخدام بالذكاء الاصطناعي",
        image: "/images/EYE.png",
        tags: ["بايثون", "جوجل كولاب", "رؤية الحاسب"],
        detailsLink: "/projects/project1",
      },
      {
        title: "الرؤية الهندسية",
        description: "تطبيق يجعل تعلم الاشكال الهندسية ممتعة للأطفال",
        image: "/images/geoo.png",
        tags: ["فلاتر", "فايربيس", "رؤية الحاسب"],
        detailsLink: "/projects/project2",
      },
    ],
  },
};

const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
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
        className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-background-card/80 to-background-card/40 backdrop-blur-lg border border-white/10"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            placeholder="blur"
            blurDataURL="/images/blur-pattern.png"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/90" />
        </div>

        <div className="relative p-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-text-primary">
              {project.title}
            </h3>
            
            <p className="text-sm text-text-secondary/80 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Link href={project.detailsLink}>
            <motion.div
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              whileHover={{ x: isRTL ? -5 : 5 }}
            >
              <span>{viewDetails}</span>
              {isRTL ? <FiArrowRight className="rotate-180" /> : <FiArrowRight />}
            </motion.div>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary/20 via-primary/0 to-primary/20" />
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
      id="projects" 
      className="relative min-h-screen py-20 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <AnimatedBackground />

      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h1 
                className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {currentContent.title}
              </motion.h1>
              <motion.p 
                className="text-lg text-text-secondary/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {currentContent.subtitle}
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 px-4">
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