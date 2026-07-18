'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiLock } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';

const content = {
  EN: {
    title: 'Projects',
    gloss: 'المشاريع',
    explore: 'Explore project',
    internal: 'Internal platform — in production at Saudi Structures',
    featured: {
      year: '2025',
      name: 'AI Personality Assessment Platform',
      description:
        'A bilingual (Arabic/English) assessment platform built for real company use: OpenAI-powered analysis, automated report generation, and data visualization of the results.',
      tags: ['OpenAI API', 'Google Apps Script', 'Data Visualization'],
    },
    projects: [
      {
        year: '2024 – 2025',
        name: 'GeoVision Explorer',
        description:
          'Graduation project: a Flutter AR app that teaches children geometry by recognizing and measuring real-world objects — YOLOv5 and OpenCV served through a Flask API.',
        image: '/images/geoo.png',
        tags: ['Flutter', 'Firebase', 'YOLOv5', 'OpenCV'],
        href: '/projects/geovision',
      },
      {
        year: '2024',
        name: 'Eye Disease Analysis System',
        description:
          'A web-based diagnosis aid that detects, segments, and classifies eye disease in retinal scans using YOLOv8 and Faster R-CNN.',
        image: '/images/EYE.png',
        tags: ['Python', 'YOLOv8', 'Faster R-CNN'],
        href: '/projects/eye-disease',
      },
    ],
  },
  AR: {
    title: 'المشاريع',
    gloss: 'Projects',
    explore: 'استكشاف المشروع',
    internal: 'منصة داخلية — قيد الاستخدام الفعلي في Saudi Structures',
    featured: {
      year: '2025',
      name: 'منصة تقييم الشخصية بالذكاء الاصطناعي',
      description:
        'منصة تقييم ثنائية اللغة (عربي/إنجليزي) مبنية لاستخدام فعلي داخل الشركة: تحليل مدعوم بـ OpenAI، وتوليد تقارير تلقائي، وعرض مرئي لنتائج التقييم.',
      tags: ['OpenAI API', 'Google Apps Script', 'عرض البيانات'],
    },
    projects: [
      {
        year: '2024 – 2025',
        name: 'GeoVision Explorer',
        description:
          'مشروع التخرج: تطبيق Flutter بالواقع المعزز يعلّم الأطفال الهندسة عبر التعرف على الأجسام الحقيقية وقياسها — YOLOv5 و OpenCV عبر واجهة Flask.',
        image: '/images/geoo.png',
        tags: ['Flutter', 'Firebase', 'YOLOv5', 'OpenCV'],
        href: '/projects/geovision',
      },
      {
        year: '2024',
        name: 'نظام تحليل أمراض العين',
        description:
          'أداة ويب مساعدة للتشخيص الطبي تكشف أمراض العين في صور الشبكية وتحدد مواقعها وتصنفها باستخدام YOLOv8 و Faster R-CNN.',
        image: '/images/EYE.png',
        tags: ['Python', 'YOLOv8', 'Faster R-CNN'],
        href: '/projects/eye-disease',
      },
    ],
  },
};

const Tag = ({ children }) => (
  <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
    {children}
  </span>
);

export default function Projects() {
  const { language } = useTheme();
  const t = content[language];

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeader title={t.title} gloss={t.gloss} />

        {/* Featured: the work project leads */}
        <Reveal>
          <article className="relative overflow-hidden rounded-xl border border-line bg-surface p-8 sm:p-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 end-4 select-none font-mark text-[9rem] leading-none text-accent/[0.05]"
            >
              صبا
            </span>
            <div className="relative">
              <p className="text-sm font-medium text-muted">{t.featured.year}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                {t.featured.name}
              </h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink/85">{t.featured.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {t.featured.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-accent">
                <FiLock className="h-4 w-4" />
                {t.internal}
              </p>
            </div>
          </article>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {t.projects.map((project, i) => (
            <Reveal key={project.href} delay={0.08 + i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-shadow hover:shadow-lg hover:shadow-ink/5">
                <Link href={project.href} className="relative block h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-sm font-medium text-muted">{project.year}</p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-ink">
                    {project.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <Link
                    href={project.href}
                    className="link-slide mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent"
                  >
                    {t.explore}
                    <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
