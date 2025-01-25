import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './' // This ensures assets are loaded correctly when deployed to GitHub Pages
}) 