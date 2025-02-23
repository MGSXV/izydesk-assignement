import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import imag1 from "@/assets/bright-red-purse-with-gold.jpg"
import imag2 from "@/assets/gold-zipper-on-black-fashion-backpack.jpg"
import imag3 from "@/assets/modern-time-pieces.jpg"
import imag4 from "@/assets/wood-leather-watches.jpg"

const HeroSection = () => {

	return (
		<Carousel className="py-16" opts={{ align: "center", container: "full",  }}>
  			<CarouselContent>
				<CarouselItem>
					<img src={imag4} />
				</CarouselItem>
				<CarouselItem>
					<img src={imag1} />
				</CarouselItem>
				<CarouselItem>
					<img src={imag2} />
				</CarouselItem>
				<CarouselItem>
					<img src={imag3} />
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}

export default HeroSection