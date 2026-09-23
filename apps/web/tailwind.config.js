/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAF8F5',
          cream: '#F5EFEB',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          subtle: '#F7F4EE',
          border: '#EAE3D6',
          'border-light': '#F0EBE0',
          dark: '#0F172A',
          charcoal: '#1E293B',
          graphite: '#334155',
          muted: '#64748B',
          light: '#FAF8F5',
          gold: {
            DEFAULT: '#B89344',
            light: '#D4B36A',
            dark: '#8E6F2B',
            50: '#FDFBF7',
            100: '#F9F4E8',
            200: '#F1E5CB',
            300: '#E4D1A6',
            400: '#D4B36A',
            500: '#B89344',
            600: '#9E7B2D',
            700: '#7E6020',
          },
          champagne: {
            DEFAULT: '#C5A059',
            light: '#F8F3E8',
            warm: '#EEDCB8',
            deep: '#8C6C27',
          },
          accent: '#1E40AF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(184, 147, 68, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'premium': '0 20px 40px -15px rgba(30, 41, 59, 0.07), 0 0 0 1px rgba(234, 227, 214, 0.7)',
        'gold-glow': '0 8px 25px -4px rgba(184, 147, 68, 0.35)',
        'card-hover': '0 20px 35px -10px rgba(184, 147, 68, 0.15), 0 0 0 1px rgba(184, 147, 68, 0.3)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4B36A 0%, #B89344 50%, #8E6F2B 100%)',
        'champagne-subtle': 'linear-gradient(180deg, #FAF8F5 0%, #F5EFEB 100%)',
        'card-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #FDFBF8 100%)',
      }
    },
  },
  plugins: [],
}
