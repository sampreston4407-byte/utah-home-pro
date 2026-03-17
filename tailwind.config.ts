import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#2D2D2D',
        accent: '#C0392B',
      },
      fontFamily: {
        lora: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#2D2D2D',
            maxWidth: 'none',
            lineHeight: '1.8',
            a: {
              color: '#C0392B',
              textDecoration: 'underline',
              '&:hover': {
                color: '#922B21',
              },
            },
            h1: {
              fontFamily: 'var(--font-lora), Georgia, serif',
              color: '#2D2D2D',
              fontWeight: '700',
              lineHeight: '1.25',
            },
            h2: {
              fontFamily: 'var(--font-lora), Georgia, serif',
              color: '#2D2D2D',
              fontWeight: '600',
              lineHeight: '1.3',
              marginTop: '2em',
            },
            h3: {
              fontFamily: 'var(--font-lora), Georgia, serif',
              color: '#2D2D2D',
              fontWeight: '600',
              lineHeight: '1.4',
            },
            strong: {
              color: '#2D2D2D',
              fontWeight: '600',
            },
            hr: {
              borderColor: '#E5E7EB',
              marginTop: '2em',
              marginBottom: '2em',
            },
            blockquote: {
              borderLeftColor: '#C0392B',
              color: '#4B5563',
            },
            'ul > li::marker': {
              color: '#C0392B',
            },
            'ol > li::marker': {
              color: '#C0392B',
            },
            code: {
              color: '#2D2D2D',
              backgroundColor: '#F3F4F6',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.375rem',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
