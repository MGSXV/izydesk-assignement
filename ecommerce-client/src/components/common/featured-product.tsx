import ImageViewer from "@/components/commerce-ui/image-viewer-basic";
import PriceFormat from "@/components/commerce-ui/price-format-basic";
import StarRatingFractions from "@/components/commerce-ui/star-rating-fractions";
import { Button } from "@/components/ui/button";
import { getRandomFloat, getRandomInt } from "@/lib/utils";
import { IProduct } from "@/types";
import { useRef } from "react";
import AddToCartForm from "@/components/cart/add-to-cart-form";

const IMAGE_URL =
	"https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/headphone-1.jpg";

function FeaturedProduct({product}: {product: IProduct}) {

	const reviewRef = useRef<number>(getRandomFloat(3.5, 5.0));
	const reviewsRef = useRef<number>(getRandomInt(100, 500));
	const stockRef = useRef<number>(getRandomInt(100, 200));

	return (
		<div className="bg-background grid grid-cols-4 gap-6 rounded-lg border p-4">
			<div className="relative col-span-4 w-full md:col-span-2">
				<div className="absolute top-2 left-2 z-10 w-fit rounded-lg bg-purple-500/80 p-2">
					<p className="text-xs font-semibold">20% OFF</p>
				</div>
				<ImageViewer imageUrl={product.avatar || IMAGE_URL} />
			</div>
			<div className="col-span-4 flex flex-col gap-6 md:col-span-2">
				<div className="flex flex-col gap-2">
					<p className="text-3xl font-semibold">{product.name}</p>
					<div className="flex flex-row flex-wrap items-center gap-2">
						<StarRatingFractions readOnly value={reviewRef.current} />
						<p className="text-lg">({reviewRef.current})</p>
						<p className="text-muted-foreground">{reviewsRef.current} reviews</p>
					</div>
					<p className="text-muted-foreground text-base">
						{product.description ?
							product.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec rhoncus elit. Sed nec nulla sit amet turpis lacinia aliquet. Nullam nec nunc nec elit ultricies ultricies. Nullam nec nunc nec elit ultricies ultricies."}
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex flex-row items-center gap-2">
						<div className="w-fit rounded-lg border border-green-500 bg-green-500/30 px-2 py-1 text-sm font-semibold text-green-500 uppercase dark:border-green-300 dark:text-green-300">
							In Stock
						</div>
						<p className="text-muted-foreground">+{stockRef.current} in stocks</p>
					</div>

					<p>
						<a href="#" className="semibold underline underline-offset-4 opacity-80 hover:opacity-100">
							Free Shipping
						</a>{" "} on all orders
					</p>
				</div>

				<PriceFormat prefix="$" value={product.price} className="text-4xl font-semibold" />

				<div className="flex flex-row flex-wrap gap-4">
					<AddToCartForm product={product} />
					<Button size="lg" className="w-full md:w-fit">
						Buy now
					</Button>
				</div>
			</div>
		</div>
	);
}

export default FeaturedProduct;
