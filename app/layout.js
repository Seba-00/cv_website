// app/layout.js

'use client';

import { usePathname } from 'next/navigation'
import { ThemeProvider } from './context/ThemeContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import ScrollToTop from './components/ScrollToTop';
import './styles/globals.css';
import { AnimatePresence } from 'framer-motion';

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isHeroPage = pathname === '/'

  return (
    <AnimatePresence mode="wait">
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
      </head>
      <body className="relative transition-colors duration-300">
        <ThemeProvider>
          <AnimatedBackground />
          <div className="relative z-10">
            {children}
          </div>
          {!isHeroPage && <ScrollToTop />}
        </ThemeProvider>
      </body>
    </html>
    </AnimatePresence>
  );
}