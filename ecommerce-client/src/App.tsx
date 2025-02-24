import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout, NotFound } from '@/components/common'
import Home from '@/components/home/home'
import Category from '@/components/category/Category'
import Product from '@/components/product/product'

function App() {

	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<Home />} />
				<Route path='/category/:id' element={<Category />} />
				<Route path='/product/:id' element={<Product />} />
				<Route path='/*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
