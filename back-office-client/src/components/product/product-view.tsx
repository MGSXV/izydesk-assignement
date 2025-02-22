import ImageViewer from "@/components/ui/ImageViewer";
import PriceFormat from "@/components/ui/PriceFormat";
import { Button } from "@/components/ui/button";
import defaultProduct from "@/assets/default-category.png"
import { useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { IProduct } from "@/types";
import { useProduct } from "@/context";
import { Edit, Trash } from "lucide-react";
import { DeleteProduct } from "./delete-product";
import { EditProduct } from "./edit-product";

export const ProductView = () => {

	const location = useLocation();
	const { products } = useProduct();
	const product_id = location.pathname.split("/").pop();
	const [product, setProduct] = useState<IProduct | undefined>(undefined);
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const handleIsOpenChange = () => setIsOpen(!isOpen);
	const handleEditingChange = () => setIsEditing(!isEditing);
	
	useEffect(() => {
		if (products.length > 0) {
			const productRef = products.find(prod => prod.id == product_id);
			setProduct(productRef);
		}
	}, [location.pathname, products])

	return (
		<Fragment>
			<div className="bg-background grid w-full max-w-screen-lg grid-cols-4 gap-6 rounded-lg border p-4 mx-auto">
				<div className="relative col-span-4 w-full md:col-span-2">
					<div className="absolute top-2 left-2 z-10 w-fit rounded-lg bg-purple-500/80 p-2">
						<p className="text-xs font-semibold">20% OFF</p>
					</div>
					<ImageViewer imageUrl={product?.avatar || defaultProduct} />
				</div>

				<div className="col-span-4 flex flex-col gap-6 md:col-span-2">
					<div className="flex flex-col gap-2">
						<p className="text-3xl font-semibold">{product?.name || `Product ${product_id}`}</p>
						<p className="text-muted-foreground text-base">
							{product?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget leo at velit imperdiet varius. In eu ipsum vitae velit congue iaculis vitae at risus."}
						</p>
					</div>

					<div className="flex flex-col gap-2">
						<div className="flex flex-row items-center gap-2">
							<div className="w-fit rounded-lg border border-green-500 bg-green-500/30 px-2 py-1 text-sm font-semibold text-green-500 uppercase dark:border-green-300 dark:text-green-300">
								In Stock
							</div>
							<p className="text-muted-foreground">+256 in stocks</p>
						</div>

						<p>
							<span className="semibold underline underline-offset-4 opacity-80 hover:opacity-100 cursor-pointer">
								Free Shipping
							</span>{" "}on all orders
						</p>
					</div>

					<PriceFormat
						prefix="$"
						value={product?.price || 0}
						className="text-4xl font-semibold"
					/>

					<div className="flex flex-row flex-wrap gap-4">
						<Button variant="outline" size="lg" className="w-full md:w-fit"
							onClick={handleEditingChange}>
							Edit <Edit className="size-6 ml-2" />
						</Button>
						<Button variant={'destructive'} size="lg" className="w-full md:w-fit"
							onClick={handleIsOpenChange}>
							Remove <Trash className="size-6 ml-2" />
						</Button>
					</div>
				</div>
			</div>
			<DeleteProduct isOpen={isOpen} id={product_id || ""} onOpenChange={handleIsOpenChange} />
			{ product && 
				<EditProduct isOpen={isEditing} product={product} onOpenChange={handleEditingChange} /> }
		</Fragment>
	);
}

