import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime in its own chunk — cached independently
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI utilities grouped together
          'vendor-ui': ['lucide-react', 'react-hot-toast'],
          // State management
          'vendor-state': ['zustand', 'axios'],
        },
      },
    },
    // Warn when any chunk exceeds 400kb
    chunkSizeWarningLimit: 400,
  },
})
