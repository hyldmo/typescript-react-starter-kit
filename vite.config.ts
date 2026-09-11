import path from 'node:path'
import tailwind from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import pkg from './package.json' with { type: 'json' }

// `~/` imports resolve against src/ (tsconfig paths mirrors this for types).
// Same convention as the other hyldmo React apps.

export default defineConfig({
	// `/` for Workers (custom domain / workers.dev), `/<repo>/` for GH Pages.
	// build:pages sets VITE_BASE; nothing else needs to change.
	base: process.env.VITE_BASE ?? '/',
	define: {
		'import.meta.env.VITE_APP_NAME': JSON.stringify(pkg.name),
		'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version)
	},
	build: {
		outDir: 'dist',
		sourcemap: true
	},
	plugins: [react(), tailwind()],
	resolve: {
		alias: {
			'~': path.resolve(import.meta.dirname, 'src')
		}
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./__tests__/setup.ts'],
		include: ['__tests__/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}']
	}
})
