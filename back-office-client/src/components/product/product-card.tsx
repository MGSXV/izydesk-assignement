import { IProduct } from "@/types"
import defaultProduct from "@/assets/default-category.png"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button";
import ImageViewer_Basic from "@/components/ui/ImageViewer";
import PriceFormat_Basic from "@/components/ui/PriceFormat";

export const ProductCard = ({ product }: { product: IProduct }) => {

	const navigator = useNavigate()

	return (
		<div className="flex w-[350px] flex-col gap-4 rounded-lg border p-2">
			<div className="relative w-full">
				<div className="absolute top-2 left-2 z-10 w-fit rounded-lg bg-primary/80 p-2">
					<p className="text-xs font-semibold">20% OFF</p>
				</div>
				<ImageViewer_Basic imageUrl={defaultProduct} />
			</div>

			<div>
				<p className="text-lg font-semibold">{product.name}</p>
				<p className="text-muted-foreground text-sm">{product.description}</p>
			</div>

			<PriceFormat_Basic
				prefix="$"
				value={product.price}
				className="text-2xl font-semibold"
			/>

			<div className="flex flex-row gap-4">
				<Button onClick={() => navigator(`/product/${product.id}`)} variant="outline" >View product</Button>
			</div>
		</div>
	);
}