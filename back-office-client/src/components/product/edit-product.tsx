import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { IProduct } from "@/types"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks"
import { useProduct } from "@/context"
import { useAxiosPrivate } from "@/config/api"

export const EditProduct = ({ isOpen, onOpenChange, product }:
	{ isOpen: boolean, product: IProduct, onOpenChange: (open: boolean) => void }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm<IProduct>()
	const [isLoading, setIsLoading] = useState(false)
	const axios = useAxiosPrivate()
	const { products, setProducts } = useProduct()
	const { toast } = useToast()

	const onSubmit = async (data: IProduct) => {
		setIsLoading(true)
		const jsonData = {
			id: product.id,
			name: data.name,
			description: data.description,
			price: data.price,
			category_id: product.category,
			// picture: data.picture,
		}

		axios.patch(`/api/products/${product.id}`, jsonData,  {
			headers: { "Content-Type": "application/json" },
			withCredentials: true
		}).then((response: any) => {
			if (response.status === 200) {
				const updated = products.filter(product => product.id !== response.data.product.id)
				setProducts([...updated, response.data.product])
			}
			toast({
				title: "Success",
				description: "Category edited successfully",
				variant: "default",
			})
			onOpenChange(false)
		}).catch(error => {
			toast({
				title: "Error",
				description: error?.message || 'An error occurred',
				variant: "destructive",
			})
		})
		.finally(() => {
			setIsLoading(false)
			onOpenChange(false)
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
					<DialogTitle>Edit product</DialogTitle>
					<DialogDescription>
						You are about to edit this product.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
						Name <span className="text-destructive">*</span>
						</Label>
						<Input id="name" placeholder="Product name" className="col-span-3" disabled={isLoading}
							{...register("name", { required: true, minLength: 4, maxLength: 20})}
							defaultValue={product.name || ""} aria-invalid={errors.name ? true : false } />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Price <span className="text-destructive">*</span>
						</Label>
						<Input id="price" placeholder="price" className="col-span-3" disabled={isLoading}
							{...register("price", { required: true, minLength: 1, maxLength: 20, min: 0, pattern: /^[0-9]+$/ })}
							defaultValue={product.price || ""} aria-invalid={errors.name ? true : false } />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="description" className="text-right">
							description
						</Label>
						<Textarea id="description" placeholder="description" className="col-span-3"
							{...register("description", { required: false, minLength: 4, maxLength: 200})}
							defaultValue={product.description || ""} aria-invalid={errors.description ? true : false }
							disabled={isLoading} />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="picture">Picture</Label>
						<Input id="picture" type="file" className="col-span-3" disabled={isLoading}
							{...register("avatar")} aria-invalid={errors.avatar ? true : false } />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
						Edit the supplier
					</Button>
					<Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isLoading}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}