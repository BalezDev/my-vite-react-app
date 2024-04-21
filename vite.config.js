import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  [react ()], base: "/my-vite-react-app",
  plugins: [react()],
})
