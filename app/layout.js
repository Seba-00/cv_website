// app/layout.js

'use client';

import { usePathname } from 'next/navigation'
import { ThemeProvider } from './context/ThemeContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import ScrollToTop from './components/ScrollToTop';
import './styles/globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isHeroPage = pathname === '/'

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
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
  );
}