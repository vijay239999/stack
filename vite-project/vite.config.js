import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
      host: '0.0.0.0', // Bind to external interface
      port: 5173,      // Ensure the correct port is used
    },  
})
