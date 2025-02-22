import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ICategory, ICategoryInfo } from "@/types"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks"
import { useCategory } from "@/context"
import { useAxiosPrivate } from "@/config/api"

export const EditCategory = ({ isOpen, onOpenChange, category }:
	{ isOpen: boolean, category: ICategory, onOpenChange: (open: boolean) => void }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm<ICategoryInfo>()
	const [isLoading, setIsLoading] = useState(false)
	const axios = useAxiosPrivate()
	const { categories, setCategories } = useCategory()
	const { toast } = useToast()

	const onSubmit = async (data: ICategoryInfo) => {
		setIsLoading(true)
		const jsonData = {
			name: data.name,
			description: data.description,
			// picture: data.picture,
		}

		axios.patch(`/api/categories/${category.id}`, jsonData,  {
			headers: { "Content-Type": "application/json" },
			withCredentials: true
		}).then((response: any) => {
			if (response.status === 200) {
				const updated = categories.filter(category => category.id !== response.data.category.id)
				setCategories([...updated, response.data.category])
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
					<DialogTitle>Edit category</DialogTitle>
					<DialogDescription>
						You are about to edit this category.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
						Name <span className="text-destructive">*</span>
						</Label>
						<Input id="name" placeholder="Category name" className="col-span-3" disabled={isLoading}
							{...register("name", { required: true, minLength: 4, maxLength: 20})}
							defaultValue={category.name || ""} aria-invalid={errors.name ? true : false } />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="description" className="text-right">
							description
						</Label>
						<Textarea id="description" placeholder="description" className="col-span-3"
							{...register("description", { required: false, minLength: 4, maxLength: 200})}
							defaultValue={category.description || ""} aria-invalid={errors.description ? true : false }
							disabled={isLoading} />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="picture">Picture</Label>
						<Input id="picture" type="file" className="col-span-3" disabled={isLoading}
							{...register("picture")} aria-invalid={errors.picture ? true : false } />
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