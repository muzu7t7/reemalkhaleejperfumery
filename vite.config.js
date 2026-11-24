import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project at /reemalkhaleejperfumery/, so production builds need that base.
// Override with VITE_BASE=/ for a custom domain or a root deployment.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: process.env.VITE_BASE ?? (command === 'build' ? '/reemalkhaleejperfumery/' : '/'),
}))
