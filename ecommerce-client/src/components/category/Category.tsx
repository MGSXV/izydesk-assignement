import { useCategory, useProduct } from "@/context";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductCard } from "../common";
import { IProduct } from "@/types";

const Category = () => {
	const location = useLocation();
	const { categories } = useCategory();
	const [name, setName] = useState('this category');
	const { products } = useProduct();
	const [currentProducts, setCurrentProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		const id = location.pathname.split('/').pop() || '';
		
		const category = categories.find(c => String(c.id) === String(id));
		
		if (category) {
			setName(category.name);
		}
		const filteredProducts = products.filter(
				(p) => String(p.category) === String(id)
		);
		
		setCurrentProducts(filteredProducts);
	}, [location, products, categories]);

	return (
		<div className="w-full max-w-7xl mx-auto py-8">
			<h1 className="text-2xl font-semibold text-foreground text-center">
					View all products under {name}
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
				{currentProducts.length === 0 && (
						<h3 className="text-center text-foreground w-full">
								{`We forgot to add products to this category :(`}
						</h3>
				)}
				{currentProducts.map((p: IProduct) => (
						<ProductCard key={p.id} product={p} />
				))}
			</div>
		</div>
	);
};

export default Category;