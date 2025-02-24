import { useProduct } from "@/context";
import { IProduct } from "@/types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FeaturedProduct } from "../common";

const Product = () => {

	const location = useLocation();
	const { products } = useProduct();
	const [currentProducts, setCurrentProducts] = useState<IProduct | null>(null);

	useEffect(() => {
		const id = location.pathname.split('/').pop() || '';
		const product = products.find(p => String(p.id) === String(id));
		if (product) {
			setCurrentProducts(product);
		}

	}, [location, products]);

	return (
		<div className="w-full max-w-7xl mx-auto py-8">
			<div>
				<FeaturedProduct product={currentProducts || {
					id: '',
					name: '',
					price: 0,
					description: '',
					avatar: '',
					category: 1
				}} />
			</div>
		</div>
	)
}

export default Product