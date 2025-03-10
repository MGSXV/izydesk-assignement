import { useProduct } from "@/context";
import { ProductCard } from "@/components/common";

const ProductsSection = () => {

	const { products } = useProduct()

	return (
		<div className="w-full py-16">
			<h1 className="text-3xl font-semibold text-center mb-8">
				View our products
			</h1>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 justify-items-center">
				{products.length === 0 && (
					<p className="text-center text-lg text-muted-foreground">
						{`Ops, maybe someone forgot to add products to Database :)`}
					</p>
				)}
				{products.slice(0, 12).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
};

export default ProductsSection;