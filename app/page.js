

// app/page.js
'use client';
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { useTheme } from './context/ThemeContext'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projectss'
import Contact from './sections/Contact'

export default function Home() {
  useScrollAnimation();
  const { isDark } = useTheme();

  return (
    <main className={`relative min-h-screen ${isDark ? 'dark' : ''}`}>
      <Hero />
      <div className="section-transition bg-background-card">
        <About />
      </div>
      <div className="section-transition bg-background-card">
        <Skills />
      </div>
      <div className="section-transition bg-background-card">
        <Projects />
      </div>
      <div className="section-transition bg-background-card">
        <Contact />
      </div>
    </main>
  );
}