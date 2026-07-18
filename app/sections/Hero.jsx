'use client';

import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import Breeze from '../components/Breeze';

const CV_PATH = '/SEBA_CV.pdf';

const content = {
  EN: {
    role: 'Application Developer · Saudi Structures — Jeddah',
    name: 'Saba Salamah',
    tagline:
      'I build AI-powered platforms, automation workflows, and full-stack web apps — the systems a company quietly runs on.',
    seeWork: 'See my work',
    downloadCV: 'Download CV',
  },
  AR: {
    role: 'مطوّرة تطبيقات · Saudi Structures — جدة',
    name: 'صبا سلامة',
    tagline:
      'أبني منصات مدعومة بالذكاء الاصطناعي، وأنظمة أتمتة، وتطبيقات ويب متكاملة — الأنظمة التي تعمل بهدوء ويُعتمد عليها كل يوم.',
    seeWork: 'شاهدي أعمالي',
    downloadCV: 'تحميل السيرة الذاتية',
  },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const rise = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { language } = useTheme();
  const t = content[language];

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <Breeze />

      {/* Ghost letterform — صبا as a landmark, not decoration */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 end-0 select-none font-mark text-[16rem] leading-none text-accent/[0.07] sm:text-[22rem] lg:-bottom-24 lg:text-[30rem]"
      >
        صبا
      </span>

      <motion.div
        className="wrap relative z-10 w-full pb-20 pt-28"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.p variants={rise} className="mb-6 flex items-center gap-2.5 text-sm font-medium text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
          </span>
          {t.role}
        </motion.p>

        <motion.h1
          variants={rise}
          className="max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          {t.name}
        </motion.h1>

        <motion.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          {t.tagline}
        </motion.p>

        <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            {t.seeWork}
            <FiArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <FiDownload className="h-4 w-4" />
            {t.downloadCV}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
