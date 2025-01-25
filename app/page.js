'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatedBackground, ScrollToTop } from './components';
import { Hero, About, Skills, Projects, Contact } from './sections';

export default function Home() {
  useScrollAnimation();

  return (
    <main className="relative">
      <AnimatedBackground />
      
      <Hero />
      <About className="animate-on-scroll" />
      <Skills className="animate-on-scroll" />
      <Projects className="animate-on-scroll" />
      <Contact className="animate-on-scroll" />

      <ScrollToTop />
    </main>
  );
}