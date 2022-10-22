import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // define: {
  //   global: 'globalThis'
  // },
  server: {
    port: 7000
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      mqtt: 'mqtt/dist/mqtt.js'
    }
  }
})
