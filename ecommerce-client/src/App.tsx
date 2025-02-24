import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout, NotFound } from '@/components/common'
import Home from '@/components/home/home'
import Category from '@/components/category/Category'
import Product from '@/components/product/product'
import PaymentForm from '@/components/payment/payment-form'
import OrderComplete from '@/components/payment/order-complete'

function App() {

	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<Home />} />
				<Route path='/category/:id' element={<Category />} />
				<Route path='/product/:id' element={<Product />} />
				<Route path='/order-complete' element={<OrderComplete />} />
				<Route path='/payment-form' element={<PaymentForm />} />
				<Route path='/*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
