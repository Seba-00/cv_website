
'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { AnimatedBackground } from '../components/AnimatedBackground';
import ScrollToTop from '../components/ScrollToTop';
import toast, { Toaster } from 'react-hot-toast';

const content = {
  EN: {
    title: "FIND ME ON",
    subtitle: "Feel free to connect with me",
    formLabels: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      submit: "Send It "
    },
    toasts: {
      success: "Message sent successfully! I'll get back to you soon 🚀",
      error: "Oops! Something went wrong. Please try again 🛠️"
    }
  },
  AR: {
    title: "لا تتردد في التواصل معي",
    subtitle: " :)",
    formLabels: {
      name: "اسمك",
      email: "بريدك الإلكتروني",
      message: "رسالتك",
      submit: "إرسال!"
    },
    toasts: {
      success: "تم إرسال الرسالة بنجاح! سأرد عليك قريبًا 🚀",
      error: "عذرًا! حدث خطأ ما. يرجى المحاولة مرة أخرى 🛠️"
    }
  }
};

const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

const InputField = ({ label, id, type = "text", rows, name }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium mb-2 text-text-primary">
      {label}
    </label>
    {rows ? (
      <textarea
        id={id}
        name={name || id}
        rows={rows}
        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 bg-primary/15 text-text-primary border border-primary/30"
        required
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name || id}
        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 bg-primary/15 text-text-primary border border-primary/30"
        required
      />
    )}
  </div>
);

const ContactForm = ({ content, isLoading, setIsLoading }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/sebasalamah00@gmail.com';

    const formData = new FormData(e.target);
    for (let [key, value] of formData.entries()) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    const configs = {
      _captcha: 'false',
      _template: 'table',
      _next: window.location.href,
      _subject: 'New Contact Form Message'
    };

    for (let [key, value] of Object.entries(configs)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    toast.success(content.toasts.success);
    
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
      />
      <InputField
        label={content.formLabels.email}
        id="email"
        name="email"
        type="email"
      />
      <InputField
        label={content.formLabels.message}
        id="message"
        name="message"
        rows={5}
      />
      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg font-bold text-white bg-primary transition-all duration-300"
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

export default function Contact() {
  const { language } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const currentContent = content[language];
  const isRTL = language === 'AR';

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Seba-00", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/seba-salamah-7916742b8/", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:sebasalamah00@gmail.com", label: "Email" },
    { icon: FaWhatsapp, href: "https://wa.me/966555948067", label: "WhatsApp" },
  ];

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-20"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <ScrollToTop />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          className: 'bg-background-card text-text-primary border border-primary',
          success: {
            iconTheme: {
              primary: 'rgb(var(--color-primary))',
              secondary: 'rgb(var(--color-background))',
            },
          },
        }}
      />
      
      <AnimatedBackground />
      
      <div className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                {currentContent.title}
              </h1>
              <p className="text-lg text-text-secondary">
                {currentContent.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal delay={0.2}>
                <div className="bg-background-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-4 text-text-primary">
                    {language === 'EN' ? "Let's Connect" : "    حساباتي الاجتماعية   " }
                  </h3>
                  <div className="space-y-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 group"
                        whileHover={{ x: isRTL ? -10 : 10 }}
                      >
                        <span className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                          <link.icon className="w-5 h-5 text-primary" />
                        </span>
                        <span className="text-lg text-text-secondary group-hover:text-primary transition-colors duration-300">
                          {link.label}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <div className="bg-background-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-4 text-text-primary">
                    {language === 'EN' ? "Send a Message" : "أرسل رسالة"}
                  </h3>
                  <ContactForm
                    content={currentContent}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/*'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { AnimatedBackground } from '../components/AnimatedBackground';
import toast, { Toaster } from 'react-hot-toast';

const content = {
  EN: {
    title: "FIND ME ON",
    subtitle: "Feel free to connect with me",
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
    title: "لا تتردد في التواصل معي",
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

const AnimatedTitle = ({ text }) => {
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
      className="text-4xl md:text-6xl font-bold mb-4 relative z-10 text-text-primary"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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

const InputField = ({ label, id, type = "text", rows, name }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium mb-2 text-text-primary">
      {label}
    </label>
    {rows ? (
      <textarea
        id={id}
        name={name || id}
        rows={rows}
        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 bg-primary/15 text-text-primary border border-primary/30"
        required
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name || id}
        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 bg-primary/15 text-text-primary border border-primary/30"
        required
      />
    )}
  </div>
);

const ContactForm = ({ content, isLoading, setIsLoading }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/sebasalamah00@gmail.com';

    const formData = new FormData(e.target);
    for (let [key, value] of formData.entries()) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    const configs = {
      _captcha: 'false',
      _template: 'table',
      _next: window.location.href,
      _subject: 'New Contact Form Message'
    };

    for (let [key, value] of Object.entries(configs)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    toast.success(content.toasts.success);
    
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
      />
      <InputField
        label={content.formLabels.email}
        id="email"
        name="email"
        type="email"
      />
      <InputField
        label={content.formLabels.message}
        id="message"
        name="message"
        rows={5}
      />
      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg font-bold text-white bg-primary transition-all duration-300"
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

export default function Contact() {
  const { language } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const currentContent = content[language];
  const isRTL = language === 'AR';

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Seba-00", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/seba-salamah-7916742b8/", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:sebasalamah00@gmail.com", label: "Email" },
    { icon: FaWhatsapp, href: "https://wa.me/966555948067", label: "WhatsApp" },
  ];

  return (
    <section id="contact" className={`min-h-screen relative overflow-hidden py-20 bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          className: 'bg-background-card text-text-primary border border-primary',
          success: {
            iconTheme: {
              primary: 'rgb(var(--color-primary))',
              secondary: 'rgb(var(--color-background))',
            },
          },
        }}
      />
      
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <AnimatedTitle text={currentContent.title} />
          <motion.p 
            className="text-xl text-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {currentContent.subtitle}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-background-card backdrop-blur-md rounded-lg shadow-xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  {language === 'EN' ? "Let's Connect" : "تواصل معنا"}
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
                      <span className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 bg-primary/20">
                        <link.icon className="w-5 h-5 text-primary" />
                      </span>
                      <span className="text-lg transition-colors duration-300 text-text-primary">
                        {link.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-background-card backdrop-blur-md rounded-lg shadow-xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  {language === 'EN' ? "Send a Message" : "أرسل رسالة"}
                </h3>
                <ContactForm
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
}*/