export interface ICategory {
	id: string
	name: string
	description: string
	parentCategoryId?: string
	subCategories?: ICategory[]
}

export interface IProduct {
	id: string
	name: string
	slug: string
	description: string
	price: number
	images: string[]
	categoryId: string
	brand: string
	stock: number
	rating: number
}

export interface ILogoProps {
	width: number
	height: number
	isFooter?: boolean
	priority?: boolean
}

export interface IButtonProps {
	text: string
	variant: 'cart' | 'checkout' | 'instagram'
	onClick?: () => void
	href?: string
}

export interface ICategoryList {
	categories: ICategory[]
	className?: string
	isFooter?: boolean
}

export interface ITooltipProps {
	content: string | React.ReactNode 
	children: React.ReactNode
	isShoppingBag?: boolean
	className?: string
}

export interface ICategoryItem {
	category: ICategory
	subcategories: ICategory[]
	isFooter?: boolean
	isHovered?: boolean
	isOpen?: boolean
	onMouseEnter?: () => void
	onMouseLeave?: () => void
	onToggle?: (event: React.MouseEvent) => void
	isMobile?: boolean
}