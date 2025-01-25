'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiDownload, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

const ResumePage = () => {
  const { language, isDark } = useTheme();
  const isRTL = language === 'AR';

  // Content configuration
  const content = {
    EN: {
      title: "My Professional Journey",
      download: "Download CV",
      back: "Back to Portfolio",
      tip: "Tip: Click the download icon for a print-friendly version 📄"
    },
    AR: {
      title: "رحلتي المهنية",
      download: "تحميل السيرة الذاتية",
      back: "العودة إلى الأعمال",
      tip: "ملاحظة: انقر على أيقونة التنزيل للحصول على نسخة قابلة للطباعة 📄"
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen relative bg-background">
      {/* Animated Background */}
      <AnimatedBackground intensity={0.1} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Navigation */}
        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between items-center mb-8`}>
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              whileHover={{ x: isRTL ? 8 : -8 }}
            >
              {isRTL ? (
                <>
                  <span>{currentContent.back}</span>
                  <FiArrowLeft className="transform rotate-180" />
                </>
              ) : (
                <>
                  <FiArrowLeft />
                  <span>{currentContent.back}</span>
                </>
              )}
            </motion.button>
          </Link>

          <motion.a
            href="/cv-seba-salamah.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-background hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload className="w-5 h-5" />
            <span>{currentContent.download}</span>
          </motion.a>
        </div>

        {/* Resume Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-background-card/50 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-border"
        >
          {/* PDF Viewer */}
          <div className="aspect-[1/1.414] w-full"> {/* Standard A4 ratio */}
            <iframe
              src="/cv-seba-salamah.pdf#view=fitH"
              className="w-full h-full"
              frameBorder="0"
              title="Seba Salamah's Resume"
            >
              <p className="p-6 text-text-secondary">
                {currentContent.tip}
              </p>
            </iframe>
          </div>
        </motion.div>

        {/* Mobile Friendly Message */}
        <div className="mt-6 text-center text-sm text-text-secondary">
          <p>{currentContent.tip}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;