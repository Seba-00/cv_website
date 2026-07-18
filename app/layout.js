import { Bricolage_Grotesque, Figtree, Alexandria, Reem_Kufi } from 'next/font/google';
import { ThemeProvider } from './context/ThemeContext';
import './styles/globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Figtree({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const arabic = Alexandria({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
});

const mark = Reem_Kufi({
  subsets: ['arabic'],
  weight: '500',
  variable: '--font-mark',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://cv-website-three-psi.vercel.app'),
  title: 'Saba Salamah — Application Developer',
  description:
    'Application developer in Jeddah building AI-powered platforms, automation workflows, and full-stack web apps. Computer Science graduate from King Abdulaziz University.',
  keywords: [
    'Saba Salamah',
    'صبا سلامة',
    'Application Developer',
    'Full Stack Developer',
    'Jeddah',
    'Saudi Arabia',
  ],
  openGraph: {
    title: 'Saba Salamah — Application Developer',
    description:
      'AI-powered platforms, automation workflows, and full-stack web apps. Jeddah, Saudi Arabia.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },
};

// Applies saved theme + language before first paint, so there is no flash
// of the wrong mode and no wrong text direction.
const themeInit = `
(function () {
  try {
    var theme = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
    var lang = localStorage.getItem('language');
    if (lang === 'AR') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${arabic.variable} ${mark.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
