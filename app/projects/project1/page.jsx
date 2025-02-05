'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { TbBrandPython } from 'react-icons/tb';
import { SiPytorch, SiOpencv, SiTensorflow } from 'react-icons/si'; // Updated here
import { FaFlask } from 'react-icons/fa';
// =================
// CONTENT CONFIGURATION
// =================

const content = {
  EN: {
    title: "Eye Disease Analysis System",
    description: "Advanced Al-powered eye disease detection and segmentation system.",
    overview: "This AI-driven system analyzes retinal scans to identify various eye diseases using advanced computer vision techniques. The platform assists medical professionals in early diagnosis and treatment planning.",
    features: [
      "Multi-disease detection (Diabetic Retinopathy, Glaucoma, etc.)",
      "High-accuracy image classification",
      "Lesion localization with object detection",
      "Retinal layer segmentation",
      "Detailed diagnostic reports",
      "Radiology-grade visualization tools"
    ],
    technical: {
      title: "Technical Implementation",
      stack: [
        { name: "Python", icon: TbBrandPython },
        { name: "PyTorch", icon: SiPytorch },
        { name: "TensorFlow", icon: SiTensorflow },
        { name: "OpenCV", icon: SiOpencv },
        { name: "Flask", icon: FaFlask },
        { name: "YOLOv8", icon: SiTensorflow },
        { name: "Faster R-CNN", icon: SiTensorflow }
      ],
      challenges: "Achieving medical-grade accuracy while maintaining real-time performance on high-resolution fundus images.",
      solutions: "Implemented model quantization and optimized preprocessing pipelines. Utilized ensemble learning with YOLOv8 and Faster R-CNN for improved detection accuracy."
    },
    images: [
      "/images/2eye.png",
      "/images/3eye.png",
      "/images/5eye.png",
      "/images/6eye.png",
      "/images/7eye.png",
      "/images/4eye.png"
    ],
    video: "SaEzj-ocdCo",
    links: {
      github: "https://github.com/name/repo",
      back: "Back to Projects"
    }
  },
  AR: {
    title: "نظام تحليل أمراض العيون",
    description: "منصة مدعومة بتعلم الآلة للكشف عن الأمراض البصرية عبر التصوير الطبي.",
    overview: "يحلل هذا النظام المدعوم بالذكاء الاصطناعي صور الشبكية لتحديد أمراض العيون المختلفة باستخدام تقنيات متقدمة للرؤية الحاسوبية. تساعد المنصة الأطباء في التشخيص المبكر والتخطيط العلاجي.",
    features: [
      "الكشف عن أمراض متعددة (اعتلال الشبكية السكري، الجلوكوما، إلخ)",
      "تصنيف الصور بدقة عالية",
      "تحديد موقع الآفات بكشف الأشياء",
      "تقسيم طبقات الشبكية",
      "تقارير تشخيصية مفصلة",
      "أدوات تصوير شعاعي متقدمة"
    ],
    technical: {
      title: "التنفيذ التقني",
      stack: [
        { name: "Python", icon: TbBrandPython },
        { name: "PyTorch", icon: SiPytorch },
        { name: "TensorFlow", icon: SiTensorflow },
        { name: "OpenCV", icon: SiOpencv },
        { name: "Flask", icon: FaFlask },
        { name: "YOLOv8", icon: SiTensorflow },
        { name: "Faster R-CNN", icon: SiTensorflow }
      ],
      challenges: "تحقيق دقة طبية مع الحفاظ على الأداء الفعلي للصور عالية الدقة",
      solutions: "تم تنفيذ تقنيات تكميم النماذج وتحسين خطوات المعالجة المسبقة. استخدام التعلم المجمع مع YOLOv8 وFaster R-CNN لتحسين دقة الكشف"
    },
    images: [
     "/images/2eye.png",
      "/images/3eye.png",
      "/images/5eye.png",
      "/images/6eye.png",
      "/images/7eye.png",
      "/images/4eye.png"
    ],
    video: "SaEzj-ocdCo",
    links: {
      github: "https://github.com/name/repo",
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      <AnimatedBackground intensity="low" />

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
       {/* Header Section */}
<div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
  <div className="flex-1 w-full">
    <Link href="/#projects" scroll={false}>
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-700/70 transition-colors text-slate-200 mb-8"
        whileHover={{ x: isRTL ? 8 : -8 }}
      >
        <FaArrowLeft className={`${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
        {currentContent.links.back}
      </motion.div>
    </Link>

    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
      <motion.h1
        className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
        variants={itemVariants}
      >
        {currentContent.title}
      </motion.h1>
      
      <motion.a
        href={currentContent.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-slate-100 group h-fit"
        whileHover={{ scale: 1.05 }}
      >
        <FaGithub className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
        <span className="text-lg font-medium">
          {isRTL ? 'عرض على GitHub' : 'View on GitHub'}
        </span>
      </motion.a>
    </div>

    <motion.div
      className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 shadow-xl"
      variants={itemVariants}
    >
      <p className="text-xl text-slate-300 leading-relaxed">
        {currentContent.description}
      </p>
    </motion.div>
  </div>
</div>
       
{/* Overview Section */}
<motion.div 
  className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-xl mb-16"
  variants={itemVariants}
>
  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
    {isRTL ? 'نظرة عامة' : 'System Overview'}
  </h2>
  <p className="text-xl text-slate-300 leading-relaxed">
    {currentContent.overview}
  </p>
</motion.div>


        {/* Image Grid Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
        >
          {currentContent.images.map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-slate-700/50 hover:border-blue-400/30 transition-all group"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={image}
                alt={`Diagnostic Sample ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </motion.div>
          ))}
        </motion.div>

        {/* Content Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Features Section */}
          <motion.div
            className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-xl"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {isRTL ? 'المميزات الرئيسية' : 'Key Features'}
            </h2>
            <div className="grid gap-4">
              {currentContent.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  </div>
                  <p className="text-slate-300 flex-1">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technical Section */}
          <motion.div
            className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-xl"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              {currentContent.technical.title}
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-200">
                  {isRTL ? 'المكدس التقني' : 'Technology Stack'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {currentContent.technical.stack.map((tech, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors text-slate-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      <tech.icon className="w-5 h-5 text-blue-400" />
                      <span>{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-200">
                  {isRTL ? 'التحديات والحلول' : 'Challenges & Solutions'}
                </h3>
                <div className="space-y-4">
                  <p className="p-4 bg-slate-700/30 rounded-xl text-slate-300">
                    {currentContent.technical.challenges}
                  </p>
                  <p className="p-4 bg-emerald-400/10 rounded-xl text-emerald-300 border border-emerald-400/20">
                    {currentContent.technical.solutions}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Video Section */}
        {currentContent.video && (
          <motion.div
            className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-xl"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {isRTL ? 'عرض النظام' : 'System Demonstration'}
            </h2>
            <div className="aspect-video rounded-xl overflow-hidden border-2 border-slate-700/50">
              <iframe
                src={`https://www.youtube.com/embed/${currentContent.video}`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}