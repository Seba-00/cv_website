'use client';

import { useTheme } from '../context/ThemeContext';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';

const content = {
  EN: {
    title: 'Skills',
    gloss: 'المهارات',
    groups: [
      {
        label: 'Languages',
        items: ['Python', 'JavaScript', 'Java', 'SQL', 'Dart'],
      },
      {
        label: 'Frameworks & Tools',
        items: [
          'Django',
          'Flask',
          'React',
          'Next.js',
          'Flutter',
          'Firebase',
          'PostgreSQL',
          'Odoo',
          'Google Apps Script',
          'OpenCV',
        ],
      },
      {
        label: 'Focus Areas',
        items: ['Full-stack development', 'API integration', 'System automation', 'Computer vision'],
      },
    ],
  },
  AR: {
    title: 'المهارات',
    gloss: 'Skills',
    groups: [
      {
        label: 'اللغات البرمجية',
        items: ['Python', 'JavaScript', 'Java', 'SQL', 'Dart'],
      },
      {
        label: 'الأطر والأدوات',
        items: [
          'Django',
          'Flask',
          'React',
          'Next.js',
          'Flutter',
          'Firebase',
          'PostgreSQL',
          'Odoo',
          'Google Apps Script',
          'OpenCV',
        ],
      },
      {
        label: 'مجالات التركيز',
        items: ['تطوير الويب المتكامل', 'تكامل الواجهات البرمجية', 'أتمتة الأنظمة', 'رؤية الحاسب'],
      },
    ],
  },
};

export default function Skills() {
  const { language } = useTheme();
  const t = content[language];

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeader title={t.title} gloss={t.gloss} />

        <div className="space-y-10">
          {t.groups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.08}>
              <div className="grid gap-4 border-t border-line pt-8 sm:grid-cols-4">
                <h3 className="eyebrow sm:col-span-1">{group.label}</h3>
                <ul className="flex flex-wrap gap-2.5 sm:col-span-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink/90 transition-colors hover:border-accent/60"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
