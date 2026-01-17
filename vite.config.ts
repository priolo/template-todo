/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
    base: '/app/',
    plugins: [
        react(),
    ],
    build: {
        outDir: 'dist',
        sourcemap: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@priolo/jon': path.resolve(__dirname, 'node_modules/@priolo/jon/dist/index.es.js'),
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
    }
})
