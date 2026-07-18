'use client';

import { useTheme } from '../context/ThemeContext';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';

const content = {
  EN: {
    title: 'Experience',
    gloss: 'الخبرات',
    current: 'Now',
    entries: [
      {
        period: 'Nov 2025 — Present',
        role: 'Application Developer',
        org: 'Saudi Structures Contracting Company · Jeddah',
        current: true,
        points: [
          'Designed and built a bilingual AI personality assessment platform on the OpenAI API, with automated report generation and data visualization.',
          'Developed Google Apps Script automation for data processing, system integration, and business logic.',
          'Manage Odoo ERP user access and support system configuration and reporting.',
        ],
      },
      {
        period: 'Jun — Aug 2024',
        role: 'Full-Stack Web Developer Intern',
        org: 'Jeddah Advanced Driving School · Jeddah',
        points: [
          'Refactored website modules to improve UI/UX responsiveness across devices.',
          'Built a trainee management system on PostgreSQL with core CRUD features.',
          'Worked with cross-functional teams to turn business requirements into features.',
        ],
      },
    ],
  },
  AR: {
    title: 'الخبرات',
    gloss: 'Experience',
    current: 'الآن',
    entries: [
      {
        period: 'نوفمبر 2025 — حتى الآن',
        role: 'مطوّرة تطبيقات',
        org: 'شركة Saudi Structures للمقاولات · جدة',
        current: true,
        points: [
          'صممت وبنيت منصة تقييم شخصية ثنائية اللغة مدعومة بالذكاء الاصطناعي عبر OpenAI API، مع توليد تقارير تلقائي وعرض مرئي للبيانات.',
          'طوّرت أنظمة أتمتة بـ Google Apps Script لمعالجة البيانات وتكامل الأنظمة ومنطق الأعمال.',
          'أدير صلاحيات مستخدمي Odoo ERP وأقدم الدعم التقني للإعدادات والتقارير.',
        ],
      },
      {
        period: 'يونيو — أغسطس 2024',
        role: 'متدربة تطوير ويب متكامل',
        org: 'مدرسة جدة المتقدمة للقيادة · جدة',
        points: [
          'أعدت هيكلة وحدات موقع الشركة لتحسين تجاوب الواجهات على مختلف الأجهزة.',
          'بنيت نظام إدارة متدربين على PostgreSQL مع عمليات الإدخال والتعديل الأساسية.',
          'تعاونت مع فرق متعددة التخصصات لتحويل متطلبات العمل إلى مزايا تقنية.',
        ],
      },
    ],
  },
};

export default function Experience() {
  const { language } = useTheme();
  const t = content[language];

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeader title={t.title} gloss={t.gloss} />

        <ol className="relative ms-2 space-y-14 border-s border-line ps-8 sm:ms-4 sm:ps-12">
          {t.entries.map((entry, i) => (
            <li key={i} className="relative">
              {/* Timeline dot — coral marks the present */}
              <span
                className={`absolute -start-[41px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background sm:-start-[55px] ${
                  entry.current ? 'bg-coral' : 'bg-accent'
                }`}
                aria-hidden="true"
              />
              <Reveal delay={i * 0.08}>
                <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted">
                  {entry.period}
                  {entry.current && (
                    <span className="rounded-full bg-coral/10 px-2.5 py-0.5 text-xs font-semibold text-coral">
                      {t.current}
                    </span>
                  )}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
                  {entry.role}
                </h3>
                <p className="mt-1 text-muted">{entry.org}</p>
                <ul className="mt-4 space-y-2.5">
                  {entry.points.map((point, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed text-ink/85">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
