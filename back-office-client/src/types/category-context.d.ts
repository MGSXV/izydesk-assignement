export interface ICategory {
	id: string,
	name: string,
	description?: string,
	avatar?: string,
}

export type TCategoryContext = {
	categories: ICategory[],
	setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>,
}

export interface ICategoryInfo {
	name: string
	description?: string
	picture?: File
}