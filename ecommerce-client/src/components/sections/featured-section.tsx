import { FeaturedProduct } from "@/components/common"
import { useProduct } from "@/context/"
import defaultImage from '@/assets/default.png'

const FeaturedSection = () => {

	const { products } = useProduct()

	return (
		<div className="py-10">
			<h1 className="text-3xl font-semibold text-center mb-8">
				Featured Product
			</h1>
			<FeaturedProduct product={products[0] ? products[0] : {
				id: '1',
				name: 'Product Name',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec rhoncus elit. Sed nec nulla sit amet turpis lacinia aliquet. Nullam nec nunc nec elit ultricies ultricies. Nullam nec nunc nec elit ultricies ultricies.',
				price: 39.99,
				avatar: defaultImage as string,
				category: 1,
			}}  />
		</div>
	)
}

export default FeaturedSection