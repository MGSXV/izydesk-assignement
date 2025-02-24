import { useCategory } from "@/context";
import { CategoryCard } from "@/components/common";

const CategoriesSection = () => {

	const { categories } = useCategory();

	return (
		<div className="w-full py-16">
			<h1 className="text-3xl font-semibold text-center mb-8">
				View more inside each category
			</h1>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 justify-items-center">
				{categories.length === 0 && (
					<p className="text-center text-lg text-muted-foreground">
						{`Ops, maybe someone forgot to add products to Database :)`}
					</p>
				)}
				{categories.slice(0, 6).map((category) => (
					<CategoryCard key={category.id} category={category} />
				))}
			</div>
		</div>
	)
};

export default CategoriesSection;