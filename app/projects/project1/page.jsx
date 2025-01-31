'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandMongodb } from 'react-icons/tb';
import { SiExpress, SiTailwindcss } from 'react-icons/si';
import { FaNode } from 'react-icons/fa';

// =================
// CONTENT CONFIGURATION
// =================

const content = {
  EN: {
    title: "Geovision Explorer",
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
        { name: "Next.js", icon: TbBrandNextjs },
        { name: "Node.js", icon: FaNode },
        { name: "Express", icon: SiExpress },
        { name: "MongoDB", icon: TbBrandMongodb },
        { name: "Tailwind CSS", icon: SiTailwindcss }
      ],
      challenges: "One of the main challenges was implementing real-time inventory updates across multiple sessions while maintaining system performance.",
      solutions: "We implemented WebSocket connections for real-time updates and utilized Redis caching to optimize database queries."
    },
    images: [
      "/images/geo1.png",
      "/images/geo2.png",
      "/images/geo3.png",
      "/images/geo4.png",
      "/images/geo5.png",
      "/images/geo6.png",
      "/images/geo7.JPG",
      "/images/geo8.JPG",
      "/images/geo9.JPG"
    ],
    video: "SaEzj-ocdCo",
    links: {
      github: "https://github.com/yourusername/ecommerce-platform",
      live: "https://ecommerce-platform-demo.com",
      back: "Back to Projects"
    }
  },
  AR: {
    title: "  الرؤية الهندسية ",
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
      "/images/geo1.png",
      "/images/geo2.png",
      "/images/geo3.png",
      "/images/geo4.png",
      "/images/geo5.png",
      "/images/geo6.png",
      "/images/geo7.JPG",
      "/images/geo8.JPG",
      "/images/geo9.JPG"
    ],
    video: "SaEzj-ocdCo",
    links: {
      github: "https://github.com/yourusername/ecommerce-platform",
      live: "https://ecommerce-platform-demo.com",
      back: "العودة إلى المشاريع"
    }
  }
};

// =================
// MAIN COMPONENT
// =================

export default function Project1() {
  const { language } = useTheme();
  const currentContent = content[language];
  const isRTL = language === 'AR';
  const [selectedImage, setSelectedImage] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120 }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <Link
          href="/#projects"
          scroll={false}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            whileHover={{ x: isRTL ? 8 : -8 }}
          >
            <FaArrowLeft className={`${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {currentContent.links.back}
          </motion.div>
        </Link>

        {/* Project Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          variants={itemVariants}
        >
          {currentContent.title}
        </motion.h1>

        {/* Project Description */}
        <motion.p
          className="text-xl mb-8 text-text-secondary"
          variants={itemVariants}
        >
          {currentContent.description}
        </motion.p>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Project Info */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Overview Card */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                {isRTL ? 'نظرة عامة' : 'Overview'}
              </h2>
              <p className="text-text-primary">{currentContent.overview}</p>
            </div>

            {/* Features Card */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                {isRTL ? 'الميزات' : 'Features'}
              </h2>
              <ul className="space-y-2">
                {currentContent.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-text-primary"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Images */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Main Image */}
            <motion.div
              className="relative aspect-video rounded-xl overflow-hidden border border-border"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={currentContent.images[selectedImage]}
                alt="Project Preview"
                fill
                className="object-cover"
                priority
                quality={100}
              />
            </motion.div>

            {/* Image Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {currentContent.images.map((image, index) => (
                <motion.button
                  key={index}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technical Details Section */}
        <motion.div className="card" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 text-primary">
            {currentContent.technical.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tech Stack */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-text-primary">
                {isRTL ? 'المكدس التقني' : 'Tech Stack'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {currentContent.technical.stack.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary"
                    whileHover={{ scale: 1.05 }}
                  >
                    <tech.icon className="w-5 h-5" />
                    <span>{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-text-primary">
                {isRTL ? 'التحديات والحلول' : 'Challenges & Solutions'}
              </h3>
              <p className="mb-4 text-text-secondary">
                {currentContent.technical.challenges}
              </p>
              <p className="text-text-secondary">
                {currentContent.technical.solutions}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Video Demo Section */}
        {currentContent.video && (
          <motion.div className="card mt-8" variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {isRTL ? 'عرض تجريبي' : 'Video Demo'}
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${currentContent.video}`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}

        {/* Footer Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-12"
          variants={itemVariants}
        >
          <motion.a
            href={currentContent.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
          >
            <FaGithub className="w-5 h-5" />
            GitHub
          </motion.a>
          <motion.a
            href={currentContent.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-secondary hover:bg-secondary/90"
            whileHover={{ scale: 1.05 }}
          >
            <FaExternalLinkAlt className="w-5 h-5" />
            {isRTL ? 'عرض مباشر' : 'Live Demo'}
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}
