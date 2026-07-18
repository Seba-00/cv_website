'use client';

import { FaGraduationCap } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';

const content = {
  EN: {
    title: 'About',
    gloss: 'نبذة',
    paragraphs: [
      "I'm a software engineer from Jeddah — a Computer Science graduate from King Abdulaziz University, software engineering track, with a 4.60/5.0 GPA. Today I work as an application developer at Saudi Structures Contracting Company, building the platforms and integrations the company runs on.",
      'What pulls me in is automation: taking a slow, manual process and turning it into something that runs itself. Recently that has meant a bilingual AI assessment platform on the OpenAI API, Google Apps Script workflows for data and business logic, and keeping an Odoo ERP well-behaved.',
    ],
    education: {
      label: 'Education',
      degree: 'B.Sc. Computer Science — Software Engineering',
      university: 'King Abdulaziz University',
      detail: '2020 – 2025 · GPA 4.60 / 5.0',
    },
    location: 'Based in Jeddah, Saudi Arabia',
  },
  AR: {
    title: 'نبذة عني',
    gloss: 'About',
    paragraphs: [
      'مهندسة برمجيات من جدة — خريجة علوم حاسب من جامعة الملك عبدالعزيز، مسار هندسة البرمجيات، بمعدل 4.60 من 5. أعمل اليوم مطوّرة تطبيقات في شركة Saudi Structures للمقاولات، أبني المنصات والتكاملات التي تعتمد عليها الشركة في عملها اليومي.',
      'أكثر شيء يشدّني هو الأتمتة: أخذ عملية يدوية بطيئة وتحويلها إلى نظام يدير نفسه. آخر ما عملت عليه: منصة تقييم ثنائية اللغة مبنية على OpenAI API، وأتمتة سير العمل بـ Google Apps Script، وإدارة نظام Odoo ERP.',
    ],
    education: {
      label: 'التعليم',
      degree: 'بكالوريوس علوم الحاسب — هندسة البرمجيات',
      university: 'جامعة الملك عبدالعزيز',
      detail: '2020 – 2025 · المعدل 4.60 / 5.0',
    },
    location: 'مقيمة في جدة، السعودية',
  },
};

export default function About() {
  const { language } = useTheme();
  const t = content[language];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeader title={t.title} gloss={t.gloss} />

        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal delay={0.05} className="space-y-5 lg:col-span-3">
            {t.paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink/90">
                {p}
              </p>
            ))}
            <p className="flex items-center gap-2 pt-2 text-sm text-muted">
              <FiMapPin className="h-4 w-4 text-accent" />
              {t.location}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="rounded-xl border border-line bg-surface p-6">
              <p className="eyebrow mb-4">{t.education.label}</p>
              <div className="flex items-start gap-4">
                <span className="mt-1 rounded-lg bg-accent/10 p-2.5 text-accent">
                  <FaGraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold leading-snug text-ink">{t.education.degree}</h3>
                  <p className="mt-1 text-sm text-muted">{t.education.university}</p>
                  <p className="mt-2 text-sm font-medium text-accent">{t.education.detail}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
