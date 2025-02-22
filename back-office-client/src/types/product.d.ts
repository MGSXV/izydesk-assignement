export interface IProduct {
	id: string,
	name: string,
	description?: string,
	price: number,
	avatar?: string,
	category: number
}

export type TProductContext = {
	products: IProduct[],
	setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
}
