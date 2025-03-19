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
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>
      <div className="fixed top-0 right-0 w-1/4 h-screen bg-gradient-to-b from-primary/5 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-primary bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg z-50"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Go Back</span>
        </motion.button>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mb-16"
        >
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Seba Salamah
            </h1>
            
            <motion.div 
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="inline-flex flex-wrap justify-center gap-6 bg-white dark:bg-gray-800 rounded-full px-8 py-4 shadow-lg"
            >
              {[
                { icon: <FiMail />, text: "sebasalamah00@gmail.com", href: "mailto:sebasalamah00@gmail.com" },
                { icon: <FiPhone />, text: "0555948067", href: "tel:0555948067" },
                { icon: <FiLinkedin />, text: "seba salamah", href: "https://linkedin.com/in/seba-salamah" },
                { icon: <FiMapPin />, text: "Jeddah" }
              ].map((item, index) => (
                item.href ? (
                  <motion.a
                    key={index}
                    variants={fadeInUp}
                    href={item.href}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                  >
                    {item.icon} {item.text}
                  </motion.a>
                ) : (
                  <motion.span
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  >
                    {item.icon} {item.text}
                  </motion.span>
                )
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <a
                href="/SEBA_CV.pdf"
                download="SEBA_CV.pdf"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <FiDownload className="w-5 h-5" />
                <span>Download CV</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
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
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Objective
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Recent Computer Science graduate with a strong technical foundation seeking an entry-level position in software
                development, data science, or emerging technology domains. Proficient in multiple programming languages and
                technologies, with a passion for solving complex problems and adapting to innovative challenges.
              </p>
            </motion.div>

            {/* Projects Section - Similar structure as before but with updated styling */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Featured Projects
              </h2>
              
              <div className="space-y-8">
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
                    className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-primary before:to-secondary"
                  >
                    <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-primary"></div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{project.title}</h3>
                    <ul className="space-y-2 mb-4">
                      {project.highlights.map((point, idx) => (
                        <li key={idx} className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <span className="font-semibold text-primary">Tools Used:</span> {project.tools}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
             {/* Training */}
             <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Training
              </h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Full Stack Web Developer Intern</h3>
                <p className="text-gray-600 dark:text-gray-300">Jeddah Advanced Driving School</p>
                <p className="text-gray-500 dark:text-gray-400">June 2024 – Aug 2024</p>
                <ul className="space-y-3">
                  {[
                    "Redesigned company website pages improving UI/UX and mobile responsiveness",
                    "Developed full-stack functionality for trainee management system using PostgreSQL",
                    "Implemented CRUD operations for trainee data management"
                  ].map((point, idx) => (
                    <li 
                      key={idx} 
                      className="text-gray-600 dark:text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-primary">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
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
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Education
              </h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">King Abdulaziz University</h3>
                <p className="text-gray-600 dark:text-gray-300">Bachelor of Science in Computer Science</p>
                <p className="text-gray-500 dark:text-gray-400">2020 – Jan 2025</p>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <span className="text-primary font-semibold">GPA:</span>
                  <span className="text-gray-600 dark:text-gray-300">4.60/5.0</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Track: Software Engineering</p>
              </div>
            </motion.div>

        {/* Skills */}
<motion.div
  variants={fadeInUp}
  className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-700"
>
  <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
    <span className="w-2 h-2 bg-primary rounded-full"></span>
    Skills
  </h2>
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Technical Skills</h3>
      <div className="flex flex-wrap gap-2">
        {["Java", "Python", "Flutter", "Firebase", "HTML", "CSS", "JavaScript", "Django", "Flask"].map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-gray-700 dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Soft Skills</h3>
      <div className="flex flex-wrap gap-2">
        {["Problem-solving", "Team collaboration", "Communication", "Time management", "Adaptability", "Quick learner"].map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 text-gray-700 dark:text-gray-200 text-sm font-medium hover:text-secondary transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
</motion.div>


           
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Resume;

