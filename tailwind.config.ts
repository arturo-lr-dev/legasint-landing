import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-out forwards',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'bounce-gentle': 'bounceGentle 3s infinite ease-in-out',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#e2e8f0',
            a: {
              color: '#93c5fd',
              '&:hover': {
                color: '#bfdbfe',
              },
            },
            strong: {
              color: '#f1f5f9',
            },
            'h1, h2, h3, h4': {
              color: '#f1f5f9',
            },
            code: {
              color: '#93c5fd',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            blockquote: {
              borderLeftColor: '#6366f1',
              color: '#cbd5e1',
            },
            hr: {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            'ul > li::marker': {
              color: '#93c5fd',
            },
            'ol > li::marker': {
              color: '#93c5fd',
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
            },
            thead: {
              borderBottomColor: 'rgba(255, 255, 255, 0.2)',
            },
            'thead th': {
              color: '#f1f5f9',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              fontWeight: '600',
              padding: '0.75rem 1rem',
              textAlign: 'left',
            },
            'tbody tr': {
              borderBottomColor: 'rgba(255, 255, 255, 0.1)',
            },
            'tbody td': {
              color: '#e2e8f0',
              padding: '0.75rem 1rem',
            },
            'tbody tr:nth-child(even)': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
