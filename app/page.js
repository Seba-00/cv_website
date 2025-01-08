'use client'
import { useScrollAnimation } from './hooks/useScrollAnimation'

import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

export default function Home() {
  useScrollAnimation()
  
  return (
    <main className="relative">
      <Hero />
      <div className="section-transition">
        <About />
      </div>
      <div className="section-transition">
        <Skills />
      </div>
      <div className="section-transition">
        <Projects />
      </div>
      <div className="section-transition">
        <Contact />
      </div>
    </main>
  )
}