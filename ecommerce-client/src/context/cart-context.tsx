"use client";

import { createContext, useContext, useState } from "react";
import { type ICartItem, IProduct } from "@/types";
import { useEffect } from "react";

interface CartContextValue {
	cartItems: ICartItem[];
	addToCart: (product: IProduct) => void;
	removeFromCart: (productId: string) => void;
	updateCartItemQuantity: (productId: string, quantity: number) => void;
	cartTotal: number;
	cartCount: number;
	data: IProduct[]
}

const CartContext = createContext<CartContextValue>({
	cartItems: [],
	addToCart: () => {},
	removeFromCart: () => {},
	updateCartItemQuantity: () => {},
	cartTotal: 0,
	cartCount: 0,
	data: []
});

export const useCart = () => {
	return useContext(CartContext);
};

interface Props {
	children: React.ReactNode;
}

export const CartProvider = ({ children }: Props) => {
	const [cartItems, setCartItems] = useState<ICartItem[]>([]);
	const [data, setData] = useState<IProduct[]>([]);

	useEffect(() => {
		const fetchProductData = async () => {
			try {
				const response = await fetch("https://fakestoreapi.com/products");
				const products = await response.json();
				setData(products);
			} catch (error) {
				console.error("Failed to fetch product data:", error);
			}
		};

		fetchProductData();
	}, []);

	const addToCart = (product: IProduct) => {
		const existingCartItemIndex = cartItems.findIndex(
			(item) => item.product.id === product.id
		);
		if (existingCartItemIndex !== -1) {
			const existingCartItem = cartItems[existingCartItemIndex];
			const updatedCartItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity + 1,
			};
			const updatedCartItems = [...cartItems];
			updatedCartItems[existingCartItemIndex] = updatedCartItem;
			setCartItems(updatedCartItems);
		} else {
			setCartItems([...cartItems, { product, quantity: 1 }]);
		}
	};

	const removeFromCart = (productId: string) => {
		const updatedCartItems = cartItems.filter(
			(item) => item.product.id !== productId
		);
		setCartItems(updatedCartItems);
	};

	const updateCartItemQuantity = (productId: string, quantity: number) => {
		const existingCartItemIndex = cartItems.findIndex(
			(item) => item.product.id === productId
		);
		if (existingCartItemIndex !== -1) {
			const existingCartItem = cartItems[existingCartItemIndex];
			const updatedCartItem = {
				...existingCartItem,
				quantity,
			};
			const updatedCartItems = [...cartItems];
			updatedCartItems[existingCartItemIndex] = updatedCartItem;
			setCartItems(updatedCartItems);
		}
	};

	const cartTotal = cartItems.reduce(
		(total, item) => total + item.product.price * item.quantity,
		0
	);

	const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateCartItemQuantity,
				cartTotal,
				cartCount,
				data
			}}
		>
			{children}
		</CartContext.Provider>
	);
};