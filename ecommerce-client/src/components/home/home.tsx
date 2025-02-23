import { FeaturedSection, HeroSection, ProductsSection } from "@/components/sections"

const Home = () => {

	return (
		<div className="w-full max-w-7xl mx-auto py-6">
			<HeroSection />
			<FeaturedSection />
			<ProductsSection />
		</div>
	)
}

export default Home