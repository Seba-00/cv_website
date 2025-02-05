'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowLeft } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Resume = () => {
  const { language } = useTheme();
  const router = useRouter();
  const isRTL = language === 'AR';

  const content = {
    EN: {
      title: "Resume",
      subtitle: "My Professional Journey",
      download: "Download CV",
      sections: {
        education: {
          title: "Education",
          items: [
            {
              degree: "Bachelor's in Computer Science",
              school: "Your University",
              date: "2019 - 2023",
              description: "Graduated with honors, focused on web development and software engineering."
            }
          ]
        },
        experience: {
          title: "Experience",
          items: [
            {
              position: "Full Stack Developer",
              company: "Company Name",
              date: "2023 - Present",
              points: [
                "Developed and maintained web applications using React and Node.js",
                "Collaborated with cross-functional teams to deliver high-quality solutions",
                "Implemented responsive designs and improved user experience"
              ]
            }
          ]
        },
        skills: {
          title: "Technical Skills",
          categories: [
            {
              name: "Frontend Development",
              skills: ["React", "Next.js", "TailwindCSS", "JavaScript", "TypeScript"]
            },
            {
              name: "Backend Development",
              skills: ["Node.js", "Express", "MongoDB", "SQL", "RESTful APIs"]
            },
            {
              name: "Development Tools",
              skills: ["Git", "VS Code", "Docker", "Figma", "AWS"]
            }
          ]
        }
      }
    },
    AR: {
      title: "السيرة الذاتية",
      subtitle: "رحلتي المهنية",
      download: "تحميل السيرة الذاتية",
      sections: {
        education: {
          title: "التعليم",
          items: [
            {
              degree: "بكالوريوس في علوم الحاسوب",
              school: "اسم الجامعة",
              date: "2019 - 2023",
              description: "تخرجت بمرتبة الشرف، مع التركيز على تطوير الويب وهندسة البرمجيات."
            }
          ]
        },
        experience: {
          title: "الخبرة العملية",
          items: [
            {
              position: "مطور ويب شامل",
              company: "اسم الشركة",
              date: "2023 - الحالي",
              points: [
                "تطوير وصيانة تطبيقات الويب باستخدام React و Node.js",
                "التعاون مع فرق متعددة التخصصات لتقديم حلول عالية الجودة",
                "تنفيذ تصاميم متجاوبة وتحسين تجربة المستخدم"
              ]
            }
          ]
        },
        skills: {
          title: "المهارات التقنية",
          categories: [
            {
              name: "تطوير الواجهة الأمامية",
              skills: ["React", "Next.js", "TailwindCSS", "JavaScript", "TypeScript"]
            },
            {
              name: "تطوير الخلفية",
              skills: ["Node.js", "Express", "MongoDB", "SQL", "RESTful APIs"]
            },
            {
              name: "أدوات التطوير",
              skills: ["Git", "VS Code", "Docker", "Figma", "AWS"]
            }
          ]
        }
      }
    }
  };

  const currentContent = content[language];

  return (
    <section 
      id="resume" 
      className={`min-h-screen py-20 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-text-secondary hover:text-primary"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>{isRTL ? 'العودة' : 'Go Back'}</span>
          </motion.button>
        </div>

        {/* Header with Download Button */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {currentContent.title}
          </h2>
          
          <motion.a
            href="/cv-seba-salamah.pdf"
            download="Seba-Salamah-Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload className="w-5 h-5" />
            <span>{currentContent.download}</span>
          </motion.a>
        </div>

        {/* Resume Cards */}
        <div className="space-y-12">
          {/* Education Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">
              {currentContent.sections.education.title}
            </h3>
            {currentContent.sections.education.items.map((item, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-xl font-semibold">{item.degree}</h4>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {item.school} • {item.date}
                </p>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Experience Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">
              {currentContent.sections.experience.title}
            </h3>
            {currentContent.sections.experience.items.map((item, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-xl font-semibold">{item.position}</h4>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {item.company} • {item.date}
                </p>
                <ul className="mt-4 space-y-2 pl-5">
                  {item.points.map((point, idx) => (
                    <li 
                      key={idx}
                      className="relative pl-4 text-gray-500 dark:text-gray-400 before:content-['•'] before:absolute before:left-0 before:text-primary"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Skills Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">
              {currentContent.sections.skills.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentContent.sections.skills.categories.map((category, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-semibold mb-3">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;