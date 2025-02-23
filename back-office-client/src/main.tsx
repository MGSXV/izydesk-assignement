import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { AuthProvider } from '@/context/'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<AuthProvider>
				<App />
			</AuthProvider>
		</ThemeProvider>
	</BrowserRouter>
)
