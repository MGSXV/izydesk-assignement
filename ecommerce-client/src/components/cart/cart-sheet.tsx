import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/common/icons";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/context/cart-context";
import { CartItem } from "./cart-item";

export default function CartSheet() {
	const { cartItems } = useCart();
	const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					aria-label="Cart"
					variant="outline"
					size="icon"
					className="relative"
				>
					{itemCount > 0 && (
						<Badge
							variant="secondary"
							className="absolute -right-2 -top-2 g-6 w-6 h-6 rounded-full p-2"
						>
							{itemCount}
						</Badge>
					)}
					<Icons.shoppingCart className="h-4 w-4" aria-hidden="true" />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
				<SheetHeader className="px-1">
					<SheetTitle>
						Cart {itemCount > 0 && `(${itemCount})`}
					</SheetTitle>
				</SheetHeader>
				<Separator />
				{itemCount > 0 && (
					<div className="flex flex-col gap-5 overflow-hidden">
						<ScrollArea className="h-full">
							<div className="flex flex-col gap-5 pr-6">
								{cartItems.map((item) => (
									<div key={item.product.id} className="space-y-3">
										<CartItem item={item} />
									</div>
								))}
							</div>
						</ScrollArea>
					</div>
				)}
				{itemCount !== 0 && (<Separator />)}
				<Button variant="default" size="lg" className="w-full" disabled={itemCount === 0}>
					Checkout
				</Button>
			</SheetContent>
		</Sheet>
	);
}