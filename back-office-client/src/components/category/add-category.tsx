import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ICategoryInfo } from "@/types"
import { useToast } from "@/hooks"
import { useCategory } from "@/context"
import { useAxiosPrivate } from "@/config/api"

export const AddCategory = ({ isOpen, onOpenChange }:
	{ isOpen: boolean, onOpenChange: (open: boolean) => void }) => {

	const [isLoading, setIsLoading] = useState(false)
	const { register, handleSubmit, formState: { errors }, reset } = useForm<ICategoryInfo>()
	const { toast } = useToast()
	const { categories, setCategories } = useCategory()
	const axios_private = useAxiosPrivate()

	const onSubmit = async (data: ICategoryInfo) => {
		setIsLoading(true)
		const jsonData = {
			name: data.name,
			description: data.description,
			// picture: data.picture,
		}
		axios_private.post("/api/categories", jsonData, {
			headers: {
				"Content-Type": "application/json"
			}, withCredentials: true
		}).then((response: any) => {
			if (response && response.data && response.data.category && response.status && response.status === 201) {
				setCategories([...categories, response.data.category])
				toast({
					title: "Success",
					description: "Category added successfully",
					variant: "default",
				})
				onOpenChange(false)
			}
		}).catch((error: any) => {
			toast({
				title: "Error",
				description: error?.response?.data?.error || 'An error occurred',
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
					<DialogTitle>Add new category</DialogTitle>
					<DialogDescription>
						Add a new category by adding a name, optionally a description and an image
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name <span className="text-destructive">*</span>
						</Label>
						<Input id="name" placeholder="New category" className="col-span-3" disabled={isLoading}
							{...register("name", { required: true, minLength: 4, maxLength: 20})}
							aria-invalid={errors.name ? true : false } />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="description" className="text-right">
						description
						</Label>
						<Textarea id="description" placeholder="description" className="col-span-3"
							{...register("description", { required: false, minLength: 4, maxLength: 200})}
							aria-invalid={errors.description ? true : false } disabled={isLoading} />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="picture">Picture</Label>
						<Input id="picture" type="file" className="col-span-3" disabled={isLoading}
							{...register("picture")} aria-invalid={errors.picture ? true : false } />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
						Add new category
					</Button>
					<Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isLoading}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}