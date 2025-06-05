import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.devse/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://authme-8hq3.onrender.com',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://authme-8hq3.onrender.com',
        changeOrigin: true
      }
    }
  }
})
