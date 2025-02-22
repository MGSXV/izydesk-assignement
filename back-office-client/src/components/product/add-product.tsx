import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { IProduct } from "@/types"
import { useToast } from "@/hooks"
import { useProduct } from "@/context"
import { useAxiosPrivate } from "@/config/api"
import { useLocation } from "react-router-dom"

export const AddProduct = ({ isOpen, onOpenChange }:
	{ isOpen: boolean, onOpenChange: (open: boolean) => void }) => {

	const [isLoading, setIsLoading] = useState(false)
	const { register, handleSubmit, formState: { errors }, reset } = useForm<IProduct>()
	const { toast } = useToast()
	const { products, setProducts } = useProduct()
	const axios_private = useAxiosPrivate()
	const location = useLocation()

	const onSubmit = async (data: IProduct) => {
		setIsLoading(true)
		const jsonData = {
			name: data.name,
			description: data.description,
			price: data.price,
			category_id: location.pathname.split("/")[2],
			// picture: data.picture,
		}
		axios_private.post("/api/products", jsonData, {
			headers: {
				"Content-Type": "application/json"
			}, withCredentials: true
		}).then((response: any) => {
			if (response && response.data && response.data.product && response.status && response.status === 201) {
				setProducts([...products, response.data.product])
				toast({
					title: "Success",
					description: "Product added successfully",
					variant: "default",
				})
				onOpenChange(false)
			}
		}).catch((error: any) => {
			
			toast({
				title: "Error",
				description: error?.message || 'An error occurred',
				variant: "destructive",
			})
		}).finally(() => {
			setIsLoading(false)
		})
	}

	useEffect(() => {
		if (isOpen)
			reset();
	}, [isOpen])
	
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add new product</DialogTitle>
					<DialogDescription>
						Add a new product by adding a name, optionally a description and an image
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name <span className="text-destructive">*</span>
						</Label>
						<Input id="name" placeholder="New product" className="col-span-3" disabled={isLoading}
							{...register("name", { required: true, minLength: 4, maxLength: 20})}
							aria-invalid={errors.name ? true : false } />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Price <span className="text-destructive">*</span>
						</Label>
						<Input id="price" placeholder="price" className="col-span-3" disabled={isLoading}
							{...register("price", { required: true, minLength: 1, maxLength: 20, min: 0, pattern: /^[0-9]+$/ })}
							aria-invalid={errors.name ? true : false } />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="description" className="text-right">
						description
						</Label>
						<Textarea id="description" placeholder="description" className="col-span-3"
							{...register("description", { required: false, minLength: 4, maxLength: 200 })}
							aria-invalid={errors.description ? true : false } disabled={isLoading} />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="picture">Picture</Label>
						<Input id="picture" type="file" className="col-span-3" disabled={isLoading}
							{...register("avatar")} aria-invalid={errors.avatar ? true : false } />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
						Add new product
					</Button>
					<Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isLoading}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}