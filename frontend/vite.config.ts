import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward all /api requests to your Render backend
      '/api': {
        target: 'https://spur-assist.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },


})
