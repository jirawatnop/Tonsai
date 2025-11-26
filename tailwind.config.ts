import type {Config} from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tonsai: {
          orange: '#FF7A00',
          orangeDark: '#ed6d0b',
          text: '#333333',
          bg: '#F7F7F7',
          gradientFrom: '#0A75AD',
          gradientTo: '#6A0DAD'
        }
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: [],
} satisfies Config
