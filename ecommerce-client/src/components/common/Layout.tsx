import { Outlet } from "react-router-dom"
import { Footer, Header } from "@/components/sections"
import { axios } from "@/config/api"
import { useEffect } from "react"
import { useCategory } from "@/context/CategoryProvider"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks"
import { useProduct } from "@/context/ProductProvider"

const Layout = () => {

	const { setCategories } = useCategory()
	const { setProducts } = useProduct()
	const { toast } = useToast()

	const fetchCategories = async () => {
		axios.get('/api/categories').then((res: any) => {
			if (res && res.data && res.status && res.status === 200) {
				setCategories([...res.data])
			}
		}).catch((error: any) => {
			toast({
				title: 'Error',
				description: error?.message || 'An error occurred',
				variant: 'destructive'
			})
		})
	}

	const fetchProducts = async () => {
		axios.get('/api/products').then((res: any) => {
			if (res && res.data && res.status && res.status === 200) {
				setProducts([...res.data])
			}
		}).catch((error: any) => {
			toast({
				title: 'Error',
				description: error?.message || 'An error occurred',
				variant: 'destructive'
			})
		})
	}

	useEffect(() => {
		fetchCategories()
		fetchProducts()
	}, [])

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
			<Toaster />
		</>
	)
}

export default Layout