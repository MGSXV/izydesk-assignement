import { IProduct, TProductContext } from "@/types";
import { createContext, useContext, useState } from "react";

const ProductContext = createContext<TProductContext>({ products: [], setProducts: () => {} });

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {

	const [products, setProducts] = useState<IProduct[]>([]);

	return (
		<ProductContext.Provider value={{ products, setProducts }}>
			{children}
		</ProductContext.Provider>
	);
}

export const useProduct = (): TProductContext => useContext(ProductContext);