'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaEye, FaFlask } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandMongodb } from 'react-icons/tb';
import { SiExpress, SiFlask, SiGooglecolab, SiTailwindcss } from 'react-icons/si';
import { FaNode } from 'react-icons/fa';
import { IoFlask, IoLogoPython } from 'react-icons/io5';

const content = {
  EN: {
    title: "Eye Disease Analysis System ",
    description: "A full-stack e-commerce solution with modern architecture and seamless user experience.",
    overview: "This e-commerce platform provides a comprehensive solution for online retail, featuring real-time inventory management, secure payment processing, and an intuitive admin dashboard.",
    features: [
      "User authentication and authorization",
      "Product catalog with advanced filtering",
      "Shopping cart with real-time updates",
      "Secure payment integration",
      "Order tracking system",
      "Admin dashboard for inventory management"
    ],
    technical: {
      title: "Technical Details",
      stack: [
        { name: "Python", icon: IoLogoPython },
        { name: "Google colab", icon: SiGooglecolab },
        { name: "Computer Vision", icon: FaEye },
        { name: "Flask", icon: SiFlask},
    
      ],
      challenges: "One of the main challenges was implementing real-time inventory updates across multiple sessions while maintaining system performance.",
      solutions: "We implemented WebSocket connections for real-time updates and utilized Redis caching to optimize database queries."
    },
    images: [
      "/images/4eye.png",
      "/images/3eye.png",
      "/images/2eye.png"
    ],
    video: "/videos/eyedemo.mov",
    links: {
      github: "https://github.com/yourusername/ecommerce-platform",
      live: "https://ecommerce-platform-demo.com",
      back: "Back to Projects"
    }
  },
  AR: {
    // Arabic content structure (mirror of English)
    title: "منصة التجارة الإلكترونية",
    description: "حل متكامل للتجارة الإلكترونية مع هيكلية حديثة وتجربة مستخدم سلسة.",
    overview: "توفر منصة التجارة الإلكترونية هذه حلاً شاملاً للبيع بالتجزئة عبر الإنترنت، مع إدارة المخزون في الوقت الفعلي، ومعالجة الدفع الآمن، ولوحة تحكم سهلة للمسؤول.",
    features: [
      "مصادقة وتفويض المستخدم",
      "كتالوج المنتجات مع تصفية متقدمة",
      "عربة تسوق مع تحديثات فورية",
      "تكامل الدفع الآمن",
      "نظام تتبع الطلبات",
      "لوحة تحكم المسؤول لإدارة المخزون"
    ],
    technical: {
      title: "التفاصيل التقنية",
      stack: [
        { name: "Next.js", icon: TbBrandNextjs },
        { name: "Node.js", icon: FaNode },
        { name: "Express", icon: SiExpress },
        { name: "MongoDB", icon: TbBrandMongodb },
        { name: "Tailwind CSS", icon: SiTailwindcss }
      ],
      challenges: "كان أحد التحديات الرئيسية هو تنفيذ تحديثات المخزون في الوقت الفعلي عبر جلسات متعددة مع الحفاظ على أداء النظام.",
      solutions: "قمنا بتنفيذ اتصالات WebSocket للتحديثات في الوقت الفعلي واستخدمنا التخزين المؤقت Redis لتحسين استعلامات قاعدة البيانات."
    },
    images: [
      "/images/project1/dashboard.jpg",
      "/images/project1/catalog.jpg",
      "/images/project1/cart.jpg"
    ],
      video: "/videos/project-demo.mp4",
    links: {
      github: "https://github.com/yourusername/ecommerce-platform",
      live: "https://ecommerce-platform-demo.com",
      back: "العودة إلى المشاريع"
    }
  }
};

export default function Project1() {
  const { theme, language } = useTheme();
  const currentContent = content[language];
  const isRTL = language === 'AR';
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground theme={theme} scrollMultiplier={0.5} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <Link href="/#projects">
          <motion.div
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg"
            style={{ 
              backgroundColor: `${theme.primary}15`,
              color: theme.primary
            }}
            whileHover={{ x: isRTL ? 8 : -8 }}
          >
            <FaArrowLeft className={`${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {currentContent.links.back}
          </motion.div>
        </Link>

        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: theme.text }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {currentContent.title}
        </motion.h1>

        <motion.p
          className="text-xl mb-8"
          style={{ color: theme.textSecondary }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {currentContent.description}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-6 rounded-xl backdrop-blur-sm"
              style={{ 
                backgroundColor: `${theme.primary}05`,
                border: `1px solid ${theme.primary}20`
              }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>
                Overview
              </h2>
              <p style={{ color: theme.text }}>{currentContent.overview}</p>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-sm"
              style={{ 
                backgroundColor: `${theme.primary}05`,
                border: `1px solid ${theme.primary}20`
              }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>
                Features
              </h2>
              <ul className="space-y-2">
                {currentContent.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2" style={{ color: theme.text }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src={currentContent.images[selectedImage]}
                alt="Project Preview"
                layout="fill"
                objectFit="cover"
                className="transition-all duration-500"
              />
            </div>
            
            <div className="flex gap-4 overflow-x-auto py-2">
              {currentContent.images.map((image, index) => (
                <motion.button
                  key={index}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2' : ''
                  }`}
                  style={{ 
                    ringColor: theme.primary,
                    opacity: selectedImage === index ? 1 : 0.6
                  }}
                  whileHover={{ opacity: 1 }}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Preview ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
          {currentContent.video && (
              <motion.div
                  className="relative aspect-video rounded-xl overflow-hidden mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
              >
                  <video controls className="w-full h-full object-cover">
                      <source src={currentContent.video} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
              </motion.div>
          )}

        <motion.div
          className="p-6 rounded-xl backdrop-blur-sm mb-8"
          style={{ 
            backgroundColor: `${theme.primary}05`,
            border: `1px solid ${theme.primary}20`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: theme.primary }}>
            {currentContent.technical.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-4">
                {currentContent.technical.stack.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ 
                      backgroundColor: `${theme.primary}15`,
                      color: theme.primary
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <tech.icon className="w-5 h-5" />
                    <span>{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
                Challenges & Solutions
              </h3>
              <p className="mb-4" style={{ color: theme.textSecondary }}>
                {currentContent.technical.challenges}
              </p>
              <p style={{ color: theme.textSecondary }}>
                {currentContent.technical.solutions}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href={currentContent.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg"
            style={{ 
              backgroundColor: `${theme.primary}15`,
              color: theme.primary
            }}
            whileHover={{ scale: 1.05 }}
          >
            <FaGithub className="w-5 h-5" />
            GitHub
          </motion.a>
          
          <motion.a
            href={currentContent.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg"
            style={{ 
              backgroundColor: theme.primary,
              color: theme.bg.split('-')[0].replace('from-', '')
            }}
            whileHover={{ scale: 1.05 }}
          >
            <FaExternalLinkAlt className="w-5 h-5" />
            Live Demo
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
