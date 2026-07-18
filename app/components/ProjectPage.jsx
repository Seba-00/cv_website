'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import Navbar from './Navbar';
import Breeze from './Breeze';
import Reveal from './Reveal';

const labels = {
  EN: {
    back: 'Back to projects',
    overview: 'Overview',
    features: 'Key features',
    stack: 'Technology stack',
    challenge: 'The challenge',
    solution: 'How I solved it',
    demo: 'Demo',
    gallery: 'Screens',
  },
  AR: {
    back: 'العودة إلى المشاريع',
    overview: 'نظرة عامة',
    features: 'أبرز المزايا',
    stack: 'التقنيات المستخدمة',
    challenge: 'التحدي',
    solution: 'كيف حليته',
    demo: 'عرض توضيحي',
    gallery: 'الشاشات',
  },
};

export default function ProjectPage({ content, imageAspect = 'aspect-[4/3]' }) {
  const { language } = useTheme();
  const t = content[language];
  const l = labels[language];

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <div className="relative overflow-hidden pb-10 pt-32">
        <Breeze className="opacity-50" />
        <div className="wrap relative z-10">
          <Reveal>
            <Link
              href="/#projects"
              className="link-slide inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              <FiArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {l.back}
            </Link>
            <p className="mt-8 text-sm font-medium text-muted">{t.year}</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{t.description}</p>
          </Reveal>
        </div>
      </div>

      <div className="wrap space-y-16 pb-24">
        <Reveal>
          <section>
            <h2 className="eyebrow mb-4">{l.overview}</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-ink/90">{t.overview}</p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="eyebrow mb-5">{l.gallery}</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {t.images.map((image, i) => (
                <div
                  key={image}
                  className={`relative ${imageAspect} overflow-hidden rounded-xl border border-line bg-surface`}
                >
                  <Image
                    src={image}
                    alt={`${t.title} — ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <section>
              <h2 className="eyebrow mb-5">{l.features}</h2>
              <ul className="space-y-3">
                {t.features.map((feature) => (
                  <li key={feature} className="flex gap-3 leading-relaxed text-ink/85">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={0.08}>
            <section>
              <h2 className="eyebrow mb-5">{l.stack}</h2>
              <div className="flex flex-wrap gap-2.5">
                {t.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-10 space-y-5">
                <div className="rounded-xl border border-line bg-surface p-6">
                  <h3 className="mb-2 text-sm font-semibold text-coral">{l.challenge}</h3>
                  <p className="leading-relaxed text-ink/85">{t.challenge}</p>
                </div>
                <div className="rounded-xl border border-line bg-surface p-6">
                  <h3 className="mb-2 text-sm font-semibold text-accent">{l.solution}</h3>
                  <p className="leading-relaxed text-ink/85">{t.solution}</p>
                </div>
              </div>
            </section>
          </Reveal>
        </div>

        {t.video && (
          <Reveal>
            <section>
              <h2 className="eyebrow mb-5">{l.demo}</h2>
              <div className="aspect-video overflow-hidden rounded-xl border border-line">
                <iframe
                  src={`https://www.youtube.com/embed/${t.video}`}
                  title={t.title}
                  className="h-full w-full"
                  allowFullScreen
                />
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </main>
  );
}
