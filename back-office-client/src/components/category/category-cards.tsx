import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCategory } from "@/context"
import { ICategory } from "@/types"
import { PlusIcon } from "@radix-ui/react-icons"
import { MouseEventHandler } from "react"
import defaultCategory from "@/assets/default-category.png"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

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

const CategoryCard = ({ category }: { category: ICategory }) => {

	const navigator = useNavigate()

	return (
		<Card className="cursor-pointer flex flex-col justify-center items-start pt-6">
			<CardContent className="flex w-full items-center justify-center flex-1">
				<div className="relative flex flex-col w-full h-full max-w-xs overflow-hidden rounded-lg">
					<div className="flex items-center justify-center w-full aspect-w-1 aspect-h-1 rounded-xl overflow-hidden mb-5">
						<img className="object-cover w-full" src={category.avatar || defaultCategory} alt="product image" />
					</div>
					<div className="flex flex-col flex-1 gap-y-4">
						<div className="flex flex-col gap-y-2">
							<a href={`/category/${category.id}`}>
								<h5 className="text-lg lg:text-xl font-bold tracking-tight truncate">
								{category.name}
								</h5>
							</a>
							<p className="text-base truncate">
								{category.description || ""}
							</p>
						</div>
						<Button onClick={() => navigator(`/category/${category.id}`)} variant="outline" >View Category</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export const CategoryCards = ({ onclick }: { onclick: MouseEventHandler<HTMLDivElement> }) => {

	const { categories } = useCategory()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Available categories</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<AddCard onclick={onclick} />
				{
					categories.map((category) => (
						<CategoryCard key={category.id} category={category} />
					))
				}
			</CardContent>
		</Card>
	)
}