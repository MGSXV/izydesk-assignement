import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout, NotFound, RequireAuth } from '@/components/common'
import { Authentication } from '@/components/auth'

function App() {

	return (
		<Routes>
			<Route element={<Layout />}>
				{/* Public routes */}
				<Route path="/auth" element={<Authentication />} />
				{/* Private routes */}
				<Route element={<RequireAuth />}>
					<Route path='/*' element={<NotFound />} />
				</Route	>
			</Route> 
		</Routes>
	)
}

export default App
