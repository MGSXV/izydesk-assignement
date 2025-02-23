import { ICategory } from "@/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import imag1 from "@/assets/bright-red-purse-with-gold.jpg"
import imag2 from "@/assets/gold-zipper-on-black-fashion-backpack.jpg"
import imag3 from "@/assets/modern-time-pieces.jpg"
import imag4 from "@/assets/wood-leather-watches.jpg"
import { getRandomInt } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
	

const CategoryCard = ({ category }: { category: ICategory }) => {

	const images = [imag1, imag2, imag3, imag4, "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/headphone-1.jpg"];
	const randomImage = images[getRandomInt(0, images.length - 1)];
	const navigate = useNavigate();
	
	return (
		<Card className="w-full">
			<div className="flex flex-col justify-between h-full">
				<img src={randomImage} />
				<CardHeader>
					<CardTitle>{category.name}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>{category.description}</CardDescription>
				</CardContent>
				<CardFooter>
					<Button onClick={() => navigate(`/category/${category.id}`)} className="w-full"
						variant={"outline"}>View products</Button>
				</CardFooter>
			</div>
		</Card>
	)
}

export default CategoryCard;