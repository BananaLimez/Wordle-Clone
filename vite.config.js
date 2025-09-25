import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <--- ADD THIS

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <--- ADD THIS
  ],
   base: '/Wordle-Clone/'
   // remember do this in json file ${import.meta.env.BASE_URL}/letters.json
})