/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        coral: 'rgb(var(--color-coral) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-arabic)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'var(--font-arabic)', 'system-ui', 'sans-serif'],
        mark: ['var(--font-mark)', 'serif'],
      },
      maxWidth: {
        wrap: '72rem',
      },
    },
  },
  plugins: [],
}

export default config
