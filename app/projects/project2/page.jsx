'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { FaGithub, FaArrowLeft } from 'react-icons/fa';
import { SiFlutter, SiFirebase, SiOpencv, SiPython, SiGooglecolab } from 'react-icons/si';
import { TbBrandYoutube } from 'react-icons/tb';
import { GiArtificialIntelligence } from 'react-icons/gi';

const content = {
  EN: {
    title: "GeoVision Explorer",
    description: "Augmented Reality app transforming geometry education for children",
    overview: "An interactive AR application that makes geometry learning fun for kids 7+ by turning their surroundings into a virtual classroom. Uses computer vision to identify and measure real-world objects, overlaying geometric principles in real-time.",
    features: [
      "Real-time object detection and measurement",
      "Interactive AR geometry overlays",
      "Child-friendly UI with engaging animations",
      "3D shape visualization and manipulation",
      "Progress tracking and achievement system",
      "Parent/teacher dashboard for monitoring",
      "Offline mode for continuous learning"
    ],
    technical: {
      title: "Technical Implementation",
      stack: [
        { name: "Flutter", icon: SiFlutter },
        { name: "Firebase", icon: SiFirebase },
        { name: "YOLOv5", icon: GiArtificialIntelligence },
        { name: "OpenCV", icon: SiOpencv },
        { name: "Flask", icon: SiPython },
        { name: "Google Colab", icon: SiGooglecolab },
        { name: "Python", icon: SiPython },
        { name: "TorchVision", icon: GiArtificialIntelligence }
      ],
      challenges: "Maintaining real-time AR performance while ensuring accurate object detection across various lighting conditions and device capabilities.",
      solutions: "Optimized model quantization for mobile devices and implemented adaptive lighting compensation algorithms. Used Firebase ML Kit for on-device processing to reduce latency."
    },
    images: [
      "/images/geo-ar1.jpg",
      "/images/geo-ar2.jpg",
      "/images/geo-ar3.jpg",
      "/images/geo-ar4.jpg",
      "/images/geo-ui1.jpg",
      "/images/geo-ui2.jpg"
    ],
    links: {
      github: "https://github.com/yourusername/geovision-app",
      demo: "https://youtu.be/demo-video-id",
      back: "Back to Projects"
    }
  },
  AR: {
    title: "جيو فيجن إكسبلورر",
    description: "تطبيق الواقع المعزز لجعل الهندسة ممتعة للأطفال",
    overview: "تطبيق تفاعلي بالواقع المعزز يحول محيط الطفل إلى فصل دراسي افتراضي. يستخدم رؤية الحاسوب للتعرف على الأشياء في الوقت الحقيقي وعرض المبادئ الهندسية بشكل تفاعلي.",
    features: [
      "كشف الأشياء وقياسها مباشرة",
      "عروض هندسية تفاعلية بالواقع المعزز",
      "واجهة مستخدم صديقة للأطفال",
      "تصور ثلاثي الأبعاد للأشكال",
      "تتبع التقدم والإنجازات",
      "لوحة تحكم للأهل والمعلمين",
      "وضع عدم الاتصال للتعلم المستمر"
    ],
    technical: {
      title: "التنفيذ التقني",
      stack: [
        { name: "Flutter", icon: SiFlutter },
        { name: "Firebase", icon: SiFirebase },
        { name: "YOLOv5", icon: GiArtificialIntelligence },
        { name: "OpenCV", icon: SiOpencv },
        { name: "Flask", icon: SiPython },
        { name: "Google Colab", icon: SiGooglecolab },
        { name: "Python", icon: SiPython },
        { name: "TorchVision", icon: GiArtificialIntelligence }
      ],
      challenges: "الحفاظ على أداء الواقع المعزز مع دقة الكشف في مختلف الإضاءات وإمكانيات الأجهزة",
      solutions: "تحسين نماذج الذكاء الاصطناعي للأجهزة المحمولة وتنفيذ خوارزميات ضبط إضاءة متكيفة. استخدام Firebase ML Kit للمعالجة على الجهاز"
    },
    images: [
      "/images/geo-ar1.jpg",
      "/images/geo-ar2.jpg",
      "/images/geo-ar3.jpg",
      "/images/geo-ar4.jpg",
      "/images/geo-ui1.jpg",
      "/images/geo-ui2.jpg"
    ],
    links: {
      github: "https://github.com/yourusername/geovision-app",
      demo: "https://youtu.be/demo-video-id",
      back: "العودة إلى المشاريع"
    }
  }
};


export default function Project2() {
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-purple-900/80 to-emerald-900/90">  {/* This is the background you want */}
      <AnimatedBackground intensity="low" />
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="flex-1">
            <Link href="/#projects" scroll={false}>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white mb-8"
                whileHover={{ x: isRTL ? 8 : -8 }}
              >
                <FaArrowLeft className={`${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {currentContent.links.back}
              </motion.div>
            </Link>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              {currentContent.title}
            </motion.h1>

            <motion.p
              className="text-xl text-white/80 mb-8"
              variants={itemVariants}
            >
              {currentContent.description}
            </motion.p>
          </div>

          <motion.div
            className="flex gap-4 items-start"
            variants={itemVariants}
          >
            <motion.a
              href={currentContent.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white group"
              whileHover={{ scale: 1.05 }}
            >
              <FaGithub className="w-6 h-6 group-hover:text-green-400 transition-colors" />
              <span className="text-lg font-medium">GitHub</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Overview Section */}
        <motion.div 
          className="bg-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/20 mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
            {isRTL ? 'نظرة عامة' : 'Project Overview'}
          </h2>
          <p className="text-xl leading-relaxed text-white/90">
            {currentContent.overview}
          </p>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
        >
          {currentContent.images.map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white/20 hover:border-green-400/30 transition-all group"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={image}
                alt={`App Screenshot ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          ))}
        </motion.div>

        {/* Content Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Features Section */}
          <motion.div
            className="bg-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/20"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text">
              {isRTL ? 'المميزات الرئيسية' : 'Key Features'}
            </h2>
            <div className="grid gap-4">
              {currentContent.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-green-400/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <p className="text-white/90 flex-1 text-lg">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technical Section */}
          <motion.div
            className="bg-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/20"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text">
              {isRTL ? 'التنفيذ التقني' : 'Technical Implementation'}
            </h2>
            <p className="text-xl text-white/90 mb-6">{currentContent.technical.challenges}</p>
            <p className="text-xl text-white/90 mb-6">{currentContent.technical.solutions}</p>
            <div className="flex gap-4 items-center">
              {currentContent.technical.stack.map((tech, index) => (
                <div key={index} className="flex items-center gap-2 text-white">
                  <tech.icon className="w-8 h-8" />
                  <span className="text-lg">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
