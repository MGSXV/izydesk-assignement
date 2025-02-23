import tsconfigPaths from 'vite-tsconfig-paths';
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			"@/*": path.resolve(__dirname, "src/*"),
		}
	},
	css: {
		postcss: {
			plugins: [tailwindcss(), ]
		}
	},
	preview: {
		port: 3002,
		strictPort: true,
	},
	server: {
		port: 3002,
		strictPort: true,
		host: true,
		origin: 'http://0.0.0.0:3002',
	}
})
