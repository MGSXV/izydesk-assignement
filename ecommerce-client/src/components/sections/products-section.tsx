import { useProduct } from "@/context";
import { ProductCard } from "@/components/common";

const ProductsSection = () => {

	const { products } = useProduct()

	return (
		<div className="py-16">
			<h1 className="text-3xl font-semibold text-center mb-8">
				View our products
			</h1>
			<div>
				{products.length === 0 && (
					<p className="text-center text-lg text-muted-foreground">
						{`Ops, maybe someone forgot to add products to Database :)`}
					</p>
				)}
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
};

export default ProductsSection;