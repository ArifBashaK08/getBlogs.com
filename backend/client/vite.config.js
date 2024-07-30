import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "^/(api/auth|api/posts|api/users)": {
        target: "http://localhost:2357",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
