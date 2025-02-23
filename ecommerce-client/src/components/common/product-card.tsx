import ImageViewer from "@/components/commerce-ui/image-viewer-basic";
import PriceFormat from "@/components/commerce-ui/price-format-basic";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types";

const IMAGE_URL =
	"https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/headphone-1.jpg";

function ProductCard({ product }: { product: IProduct}) {

	return (
		<div className="flex w-[350px] flex-col gap-4 rounded-lg border p-2">
			<div className="relative w-full">
				<ImageViewer imageUrl={product.avatar || IMAGE_URL} />
			</div>

			<div>
				<p className="text-lg font-semibold">{product.name}</p>
				<p className="text-muted-foreground text-sm">Shipped in 2-3 days</p>
			</div>

			<PriceFormat
				prefix="$"
				value={product.price}
				className="text-2xl font-semibold"
			/>

			<div className="flex flex-row gap-4">
				<Button variant="outline">Add to cart</Button>
				<Button>Buy now</Button>
			</div>
		</div>
	);
}

export default ProductCard;
