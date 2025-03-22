export interface ICategory {
	id: number
	name: string
	slug: string
	image: string
	creationAt: string
	updatedAt: string
	ParentCategoryId?: number
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

export interface ICategoryListProps {
	className?: string
	isFooter?: boolean
}