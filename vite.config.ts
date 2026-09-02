import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Project Pages URL is https://<user>.github.io/LDRG/
const base = process.env.GITHUB_PAGES === 'true' ? '/LDRG/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
