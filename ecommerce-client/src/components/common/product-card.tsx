import ImageViewer from "@/components/commerce-ui/image-viewer-basic";
import PriceFormat from "@/components/commerce-ui/price-format-basic";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types";
import imag1 from "@/assets/bright-red-purse-with-gold.jpg"
import imag2 from "@/assets/gold-zipper-on-black-fashion-backpack.jpg"
import imag3 from "@/assets/modern-time-pieces.jpg"
import imag4 from "@/assets/wood-leather-watches.jpg"
import { getRandomInt } from "@/lib/utils";
import AddToCartForm from "@/components/cart/add-to-cart-form";

function ProductCard({ product }: { product: IProduct}) {

	const images = [imag1, imag2, imag3, imag4, "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/headphone-1.jpg"];
	const randomImage = images[getRandomInt(0, images.length - 1)];

	return (
		<div className="flex w-xs flex-col gap-4 rounded-lg border p-2">
			<a href={`/product/${product.id}`}>
				<div className="relative w-full">
					<ImageViewer imageUrl={product.avatar || randomImage} />
				</div>
				<div>
					<p className="text-lg font-semibold">{product.name}</p>
					<p className="text-muted-foreground text-sm">Shipped in 2-3 days</p>
				</div>
				<PriceFormat prefix="$" value={product.price} className="text-2xl font-semibold"/>
			</a>

			<div className="flex flex-row gap-4">
				<AddToCartForm product={product} />
				<Button variant="outline">Add to cart</Button>
				<Button>Buy now</Button>
			</div>
		</div>
	);
}

export default ProductCard;
