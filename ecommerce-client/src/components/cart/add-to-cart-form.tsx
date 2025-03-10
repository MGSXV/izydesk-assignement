"use client"

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { IProduct } from "@/types";
import { Button } from "../ui/button";

interface AddToCartFormProps {
	product?: IProduct | null;
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
	const { addToCart, cartItems } = useCart();
	const [_quantity, setQuantity] = useState(0);

	const handleAddToCart = () => {
		if (product) {
			addToCart(product);
			setQuantity(1);
		}
	};

	const isProductInCart =
		product && cartItems.some((item) => item.product.id === product.id);

	return (
		<div>
			<Button aria-label="Add to cart" variant="outline" onClick={handleAddToCart} disabled={isProductInCart ? true : undefined}>
				{isProductInCart ? "Added" : "Add to cart"}
			</Button>
		</div>
	);
}