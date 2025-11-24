import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Security: Hides source maps in production to prevent code theft
    sourcemap: false
  },
  build: {
    // Optimization: Minify code to reduce bandwidth costs
    minify: 'terser',
    rollupOptions: {
        output: {
            manualChunks: {
                vendor: ['react', 'react-dom', 'firebase/app', 'firebase/auth', 'firebase/firestore'],
                icons: ['lucide-react']
            }
        }
    }
  }
})