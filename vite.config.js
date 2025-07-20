import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
  // Remove or comment out proxy for production deployment
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://vaultifyadmin.onrender.com',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
})
