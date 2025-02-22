import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout, LayoutAuth, NotFound, RequireAuth } from '@/components/common'
import { Authentication } from '@/components/auth'
import { Dashboard } from '@/components/dashboard'
import { ProductsCards } from '@/components/category'
import { ProductProvider } from './context'
import { ProductView } from '@/components/product'

function App() {

	return (
		<ProductProvider>
			<Routes>
				<Route element={<Layout />}>
					{/* Public routes */}
					<Route path="/auth" element={<Authentication />} />
					{/* Private routes */}
					<Route element={<RequireAuth />}>
						<Route element={<LayoutAuth />}>
							<Route path='/' element={<Dashboard />} />
							<Route path='/category/:id' element={<ProductsCards />} />
							<Route path='/product/:id' element={<ProductView />} />
							<Route path='/*' element={<NotFound />} />
						</Route>
					</Route	>
				</Route> 
			</Routes>
		</ProductProvider>
	)
}

export default App
