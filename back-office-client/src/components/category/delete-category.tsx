import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useCategory } from "@/context"
import { useAxiosPrivate } from "@/config/api"
import { useToast } from "@/hooks"

export const DeleteCategory = ({ isOpen, onOpenChange, id }:
	{ isOpen: boolean, id: string, onOpenChange: (open: boolean) => void }) => {

	const [isLoading, setIsLoading] = useState(false)
	const { categories, setCategories } = useCategory()
	const axios = useAxiosPrivate()
	const { toast } = useToast()

	const handleDelete = () => {
		setIsLoading(true)
		axios.delete(`/api/categories/${id}`).then(response => {
			if (response.status === 200) {
				setCategories(categories.filter(category => category.id !== id))
			}
		}).catch(error => {
			toast({
				title: 'Error',
				description: error?.message || 'An error occurred',
				variant: 'destructive'
			})

		}).finally(() => {
			setIsLoading(false)
			onOpenChange(false)
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<DialogDescription>
						You are about to delete this category with all the products and categories associated
						with it. This action cannot be undone.
					</DialogDescription>
				</div>
				<DialogFooter>
					<Button type="submit" variant="destructive" onClick={handleDelete} disabled={isLoading}>
						Yes, delete
					</Button>
					<Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isLoading}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}