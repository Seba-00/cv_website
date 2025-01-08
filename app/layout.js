// app/layout.js

import { ThemeProvider } from './context/ThemeContext';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <main className="transition-colors duration-300">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}