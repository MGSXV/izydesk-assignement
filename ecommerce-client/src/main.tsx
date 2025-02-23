import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CategoryProvider } from '@/context/CategoryProvider.tsx'

createRoot(document.getElementById('root')!).render(

	<BrowserRouter>
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<CategoryProvider>
				<App />
			</CategoryProvider>
		</ThemeProvider>
	</BrowserRouter>
)
