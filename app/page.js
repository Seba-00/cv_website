'use client'

import { useScrollAnimation } from './hooks/useScrollAnimation'
import { useTheme } from './context/ThemeContext'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

export default function Home() {
  useScrollAnimation();
  const { theme } = useTheme();

  return (
    <main 
      className="relative min-h-screen"
      style={{
        background: theme.bg === 'from-gray-50 to-gray-100' 
          ? 'var(--gradient-light)' 
          : 'var(--gradient-dark)'
      }}
    >
      <Hero />
      <div className="section-transition bg-opacity-90">
        <About />
      </div>
      <div className="section-transition bg-opacity-90">
        <Skills />
      </div>
      <div className="section-transition bg-opacity-90">
        <Projects />
      </div>
      <div className="section-transition bg-opacity-90">
        <Contact />
      </div>
    </main>
  );
}