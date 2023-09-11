/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px', // min-width
      'sm':'780px',
      'md':'1000px',
      'lg':'1280px',
      'xl':'1500px',

    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'primary':{
          light:'#ef4444',
          dark:'#dc2626'
        },
        'secondary':{
light:"#dbeafe",
dark:"#0284c7"
        },
        'dark':{
          light:'#57534e',
          dark:'#292524'
        }
      
      },
      boxShadow:{
        'sm':'rgba(0, 0, 0, 0.16) 0px 1px 4px'
      },
     
      borderColor:{
        light:'#e5e7eb',
        default:'#6b7280',
        dark:"#111827"
      },
      borderWidth:{
        sm:'1px',
        md:'2px'
      },
      
      
    
    },
   
  },
  plugins: [],
}
