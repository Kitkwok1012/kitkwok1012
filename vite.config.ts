import { defineConfig } from 'vite'

// Minimal config for a static React site. Adjust base if deploying under a subpath.
export default defineConfig({
  build: {
    outDir: 'dist'
  }
})
