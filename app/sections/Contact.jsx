'use client';

/**
 * Contact Page Component
 * A fully responsive contact page with form submission and social links
 * Features:
 * - Form submission using FormSubmit
 * - Bilingual support (English/Arabic)
 * - Theme support
 * - Social media links
 * - Toast notifications
 * - Loading states
 * - Animations
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { AnimatedBackground } from '../components/AnimatedBackground';
import toast, { Toaster } from 'react-hot-toast';

// Content configuration for multilingual support
const content = {
  EN: {
    title: "FIND ME ONnnnnnk",
    subtitle: "Feel free to connect with me ",
    formLabels: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      submit: "Send It My Way!"
    },
    toasts: {
      success: "Message sent successfully! I'll get back to you soon 🚀",
      error: "Oops! Something went wrong. Please try again 🛠️"
    }
  },
  AR: {
    title: "لا تتردد في التواصل معي ",
    subtitle: "تواصل معي",
    formLabels: {
      name: "اسمك",
      email: "بريدك الإلكتروني",
      message: "رسالتك",
      submit: "أرسلها إلي!"
    },
    toasts: {
      success: "تم إرسال الرسالة بنجاح! سأرد عليك قريبًا 🚀",
      error: "عذرًا! حدث خطأ ما. يرجى المحاولة مرة أخرى 🛠️"
    }
  }
};

/**
 * Animated Title Component
 * Renders a title with word-by-word animation
 */
const AnimatedTitle = ({ text, theme }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const words = text.split(" ");

  return (
    <motion.h1
      className="text-4xl md:text-6xl font-bold mb-4 relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ color: theme.text }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mx-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

/**
 * Input Field Component
 * Reusable component for form inputs and textareas
 */
const InputField = ({ label, id, type = "text", theme, rows, name }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
      {label}
    </label>
    {rows ? (
      <textarea
        id={id}
        name={name || id}
        rows={rows}
        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
        style={{
          backgroundColor: `${theme.primary}15`,
          color: theme.text,
          borderColor: theme.primary,
        }}
        required
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name || id}
        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
        style={{
          backgroundColor: `${theme.primary}15`,
          color: theme.text,
          borderColor: theme.primary,
        }}
        required
      />
    )}
  </div>
);

/**
 * Contact Form Component
 * Handles form submission using FormSubmit service
 */
const ContactForm = ({ theme, content, isLoading, setIsLoading }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create a new form element for submission
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/sebasalamah00@gmail.com';

    // Add form data
    const formData = new FormData(e.target);
    for (let [key, value] of formData.entries()) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    // Add FormSubmit configuration
    const configs = {
      _captcha: 'false',
      _template: 'table',
      _next: window.location.href,
      _subject: 'New Contact Form Message'
    };

    // Add configuration fields
    for (let [key, value] of Object.entries(configs)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    // Submit form and show success message
    document.body.appendChild(form);
    toast.success(content.toasts.success);
    
    // Delay submission to show toast
    setTimeout(() => {
      form.submit();
      document.body.removeChild(form);
      setIsLoading(false);
      e.target.reset();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label={content.formLabels.name}
        id="name"
        name="name"
        theme={theme}
      />
      <InputField
        label={content.formLabels.email}
        id="email"
        name="email"
        type="email"
        theme={theme}
      />
      <InputField
        label={content.formLabels.message}
        id="message"
        name="message"
        theme={theme}
        rows={5}
      />
      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg font-bold text-white transition-all duration-300"
        style={{ backgroundColor: theme.primary }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <motion.span
              className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="ml-2">Sending...</span>
          </span>
        ) : (
          content.formLabels.submit
        )}
      </motion.button>
    </form>
  );
};

/**
 * Main Contact Page Component
 * Combines all components and handles page layout
 */
export default function Contact() {
  const { theme, language } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const currentContent = content[language];
  const isRTL = language === 'AR';

  // Social media links configuration
  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Seba-00", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/seba-salamah-7916742b8/", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:sebasalamah00@gmail.com", label: "Email" },
    { icon: FaWhatsapp, href: "https://wa.me/966555948067", label: "WhatsApp" },
  ];

  return (
    <section id="contact" className={`min-h-screen relative overflow-hidden py-20 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme.cardBg,
            color: theme.text,
            border: `1px solid ${theme.primary}`,
          },
          success: {
            iconTheme: {
              primary: theme.primary,
              secondary: 'white',
            },
          },
        }}
      />
      
      <AnimatedBackground theme={theme} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <AnimatedTitle text={currentContent.title} theme={theme} />
          <motion.p 
            className="text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ color: theme.textSecondary }}
          >
            {currentContent.subtitle}
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Social Links Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-6" 
                   style={{ backgroundColor: theme.cardBg }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>
                  Let's Connect
                </h3>
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 group"
                      whileHover={{ x: 10 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                            style={{ backgroundColor: `${theme.primary}20` }}>
                        <link.icon className="w-5 h-5" style={{ color: theme.primary }} />
                      </span>
                      <span className="text-lg transition-colors duration-300" style={{ color: theme.text }}>
                        {link.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-6" 
                   style={{ backgroundColor: theme.cardBg }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>
                  Send a Message
                </h3>
                <ContactForm
                  theme={theme}
                  content={currentContent}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}