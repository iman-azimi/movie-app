module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Tailwind Modal
        'primary': '#549DF2',
        'gray-150': '#f1f1f1',
        'gray-160': '#c4c4c4',
        'gray-170': '#e2e2e2',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '600px',
        md: '728px',
        lg: '1024px',
        xl: '1240px',
        '2xl': '1496px',
      },
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
