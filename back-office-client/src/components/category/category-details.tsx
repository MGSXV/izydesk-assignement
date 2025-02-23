import { useCategory, useProduct } from "@/context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon } from "@radix-ui/react-icons"
import { Fragment, MouseEventHandler, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useAxiosPrivate } from "@/config/api"
import { AddProduct, ProductCard } from "@/components/product"
import { useToast } from "@/hooks"

const AddCard = ({ onclick }: { onclick: MouseEventHandler<HTMLDivElement> }) => {

	return (
		<Card className={`flex items-center justify-center cursor-pointer transition-colors duration-300
			hover:text-secondary`} onClick={onclick}>
			<CardContent className="m-0 p-0">
				<PlusIcon className="size-28" />
			</CardContent>
		</Card>
	)
}

export const ProductsCards = () => {

	const { categories } = useCategory()
	const location = useLocation()
	const [currentCategory, setCurrentCategory] = useState("the current category")
	const axios_private = useAxiosPrivate()
	const { products, setProducts } = useProduct()
	const { toast } = useToast()
	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => setIsOpen(!isOpen)

	const fetchProducts = async () => {
		const arr = location.pathname.split("/")
		const categoryId = arr[arr.length - 1]
		axios_private.get(`api/categories/${categoryId}/products`).then((response) => {
			setProducts([...response.data])
		}).catch((error) => {
			toast({
				title: "Error",
				description: error?.message || 'An error occurred',
				variant: "destructive",
			})
		})
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	useEffect(() => {
		const arr = location.pathname.split("/")
		const categoryId = arr[arr.length - 1]
		const category = categories.find((category) => category.id == categoryId)
		if (category) {
			setCurrentCategory(category.name)
		}
	}, [location.pathname, categories])

	return (
		<Fragment>
			<Card>
				<CardHeader>
					<CardTitle>Available products on {currentCategory}</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<AddCard onclick={handleOpen} />
					{
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))
					}
				</CardContent>
			</Card>
			<AddProduct isOpen={isOpen} onOpenChange={handleOpen} />
		</Fragment>
	)
}