import { ICartItem } from "@/types";
import PriceFormat from "@/components/commerce-ui/price-format-basic";
import { CartItemActions } from "./update-cart";
import imag1 from "@/assets/bright-red-purse-with-gold.jpg"
import imag2 from "@/assets/gold-zipper-on-black-fashion-backpack.jpg"
import imag3 from "@/assets/modern-time-pieces.jpg"
import imag4 from "@/assets/wood-leather-watches.jpg"
import { getRandomInt } from "@/lib/utils";

interface CartItemProps {
	item: ICartItem;
}

export function CartItem({ item }: CartItemProps) {
	const images = [imag1, imag2, imag3, imag4, "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/headphone-1.jpg"];
	const randomImage = images[getRandomInt(0, images.length - 1)];
	return (
		<div className="flex items-center space-x-4">
			<div className="relative h-16 w-16 overflow-hidden rounded">
				<img
					src={item.product.avatar || randomImage}
					alt={item.product.name}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="absolute object-cover"
					loading="lazy"
				/>
			</div>
			<div className="flex flex-1 flex-col gap-1 self-start text-sm">
				<span className="line-clamp-1">{item.product.name}</span>
				<span className="line-clamp-1 text-muted-foreground">
					<PriceFormat value={item.product.price} />
					<span> ={" "}</span>
					<PriceFormat value={item.product.price * item.quantity} />
				</span>
				<span className="line-clamp-1 text-xs capitalize text-muted-foreground">
					{item.product.category}
				</span>
			</div>
			<CartItemActions item={item} />
		</div>
	);
}