'use client';
import dynamic from 'next/dynamic'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { useTheme } from './context/ThemeContext'

// Dynamically import heavy components
const Hero = dynamic(() => import('./sections/Hero'), { ssr: false })
const About = dynamic(() => import('./sections/About'), { ssr: false })
const Skills = dynamic(() => import('./sections/Skills'), { ssr: false })
const Projects = dynamic(() => import('./sections/Projectss'), { ssr: false })
const Contact = dynamic(() => import('./sections/Contact'), { ssr: false })

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