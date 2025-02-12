'use client';
import { usePathname } from 'next/navigation'
import { ThemeProvider } from './context/ThemeContext';
import dynamic from 'next/dynamic';
import './styles/globals.css';

// Dynamically import AnimatedBackground with no SSR
const AnimatedBackground = dynamic(
  () => import('./components/AnimatedBackground'),
  { ssr: false }
);

// Dynamically import ScrollToTop with no SSR
const ScrollToTop = dynamic(
  () => import('./components/ScrollToTop'),
  { ssr: false }
);

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isHeroPage = pathname === '/'

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" 
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
      </head>
      <body className="relative">
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