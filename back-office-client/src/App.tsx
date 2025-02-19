import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout, NotFound, RequireAuth } from '@/components/common'
import { Authentication } from '@/components/auth'

function App() {

	return (
		<Router>
		 	<Routes>
		 		<Route element={<Layout />}>
		 			{/* Public routes */}
		 			<Route path="/auth" element={<Authentication />} />
		 			<Route path='/*' element={<NotFound />} />
		 			{/* Private routes */}
		 			<Route element={<RequireAuth />}>
		 			</Route>
		 		</Route> 
		 	</Routes>
		 </Router>
	)
}

export default App
