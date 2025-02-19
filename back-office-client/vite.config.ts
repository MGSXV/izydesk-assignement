import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react()],
	resolve: {
		alias: {
			'@': '/src'
		}
	},
	css: {
		postcss: {
			plugins: [tailwindcss(), ]
		}
	},
	preview: {
		port: 3000,
		strictPort: true,
	},
	server: {
		port: 3000,
		strictPort: true,
		host: true,
		origin: '*',
	}
})
