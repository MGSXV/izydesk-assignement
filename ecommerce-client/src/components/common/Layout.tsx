import { Outlet } from "react-router-dom"
import { Footer, Header } from "@/components/sections"
import { axios } from "@/config/api"
import { useEffect } from "react"
import { useCategory } from "@/context/CategoryProvider"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks"

const Layout = () => {

	const { setCategories } = useCategory()
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

	useEffect(() => {
		fetchCategories()
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