import { Card, CardContent,/* CardHeader, CardTitle*/ } from "@/components/ui/card"
import { IProduct } from "@/types"
import defaultProduct from "@/assets/default-category.png"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

export const ProductCard = ({ product }: { product: IProduct }) => {

	const navigator = useNavigate()

	return (
		<Card className="cursor-pointer flex flex-col justify-center items-start pt-6">
			<CardContent className="flex w-full items-center justify-center flex-1">
				<div className="relative flex flex-col w-full h-full max-w-xs overflow-hidden rounded-lg">
					<div className="flex items-center justify-center w-full aspect-w-1 aspect-h-1 rounded-xl overflow-hidden mb-5">
						<img className="object-cover w-full" src={product.avatar || defaultProduct} alt="product image" />
					</div>
					<div className="flex flex-col flex-1 gap-y-4">
						<div className="flex flex-col gap-y-2">
							<a href={`/category/${product.id}`}>
								<h5 className="text-lg lg:text-xl font-bold tracking-tight truncate">
								{product.name}
								</h5>
							</a>
							<p className="text-base truncate">
								{product.description || ""}
							</p>
						</div>
						<Button onClick={() => navigator(`/product/${product.id}`)} variant="outline" >View product</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}