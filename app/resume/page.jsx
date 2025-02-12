'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowLeft, FiMail, FiPhone, FiLinkedin, FiMapPin } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Resume = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-primary"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </motion.button>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Seba Salamah
          </h1>
          
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-300 mb-8"
          >
            <motion.a variants={fadeInUp} href="mailto:sebasalamah00@gmail.com" className="flex items-center gap-2 hover:text-primary">
              <FiMail /> sebasalamah00@gmail.com
            </motion.a>
            <motion.a variants={fadeInUp} href="tel:0555948067" className="flex items-center gap-2 hover:text-primary">
              <FiPhone /> 0555948067
            </motion.a>
            <motion.a variants={fadeInUp} href="https://linkedin.com/in/seba-salamah" className="flex items-center gap-2 hover:text-primary">
              <FiLinkedin /> seba salamah
            </motion.a>
            <motion.span variants={fadeInUp} className="flex items-center gap-2">
              <FiMapPin /> Jeddah
            </motion.span>
          </motion.div>

          <motion.a
            href="/cv-seba-salamah.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload className="w-5 h-5" />
            <span>Download CV</span>
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="lg:col-span-2 space-y-8"
          >
            {/* Objective */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">Objective</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Recent Computer Science graduate with a strong technical foundation seeking an entry-level position in software
                development, data science, or emerging technology domains. Proficient in multiple programming languages and
                technologies, with a passion for solving complex problems and adapting to innovative challenges.
              </p>
            </motion.div>

            {/* Projects */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary">Featured Projects</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "GeoVision Explorer",
                    highlights: [
                      "Winner, Faculty Poster Day - Senior Project",
                      "Led frontend development, backend integration, and Flask-based model deployment",
                      "Developed AR-based mobile application for interactive geometry learning",
                      "Integrated computer vision for real-time object measurement"
                    ],
                    tools: "Flutter, Firebase, YOLOv5, OpenCV, Flask, Google Colab, Python, TorchVision, rembg"
                  },
                  {
                    title: "Eye Disease Analysis System",
                    highlights: [
                      "Developed a web-based system for analyzing eye images using deep learning",
                      "Implemented image classification, object detection, and segmentation",
                      "Utilized advanced models like YOLOv8 and Faster R-CNN"
                    ],
                    tools: "Google Colab, Python, YOLOv8, Faster R-CNN, Flask, HTML, CSS"
                  }
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-primary pl-6 space-y-3"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{project.title}</h3>
                    <ul className="space-y-2">
                      {project.highlights.map((point, idx) => (
                        <li key={idx} className="text-gray-600 dark:text-gray-300">{point}</li>
                      ))}
                    </ul>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Tools Used:</span> {project.tools}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            {/* Education */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">Education</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">King Abdulaziz University</h3>
                <p className="text-gray-600 dark:text-gray-300">Bachelor of Science in Computer Science</p>
                <p className="text-gray-500 dark:text-gray-400">2020 – Jan 2025</p>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold">GPA:</span>
                  <span className="text-gray-600 dark:text-gray-300">4.60/5.0</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Track: Software Engineering</p>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary">Skills</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "Python", "Flutter", "Firebase", "HTML", "CSS", "JavaScript", "Django", "Flask"].map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Problem-solving", "Team collaboration", "Communication", "Time management", "Adaptability", "Quick learner"].map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Training */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">Training</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Full Stack Web Developer Intern</h3>
                <p className="text-gray-600 dark:text-gray-300">Jeddah Advanced Driving School</p>
                <p className="text-gray-500 dark:text-gray-400">June 2024 – Aug 2024</p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Redesigned company website pages improving UI/UX and mobile responsiveness</li>
                  <li>• Developed full-stack functionality for trainee management system using PostgreSQL</li>
                  <li>• Implemented CRUD operations for trainee data management</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Resume;