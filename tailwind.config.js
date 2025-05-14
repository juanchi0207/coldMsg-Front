// tailwind.config.js (extracto)
module.exports = {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
   darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#6366F1',
        accent: '#10B981',
        error: '#EF4444',
        neutral: '#F3F4F6'
      },
      fontSize: {
        sm: ['0.875rem', '1.25rem'],
        base: ['1rem', '1.5rem'],
        lg: ['1.125rem', '1.75rem'],
        xl: ['1.25rem', '1.75rem'],
        '2xl': ['1.5rem', '2rem']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
