export interface ICategory {
	id: string
	name: string
	slug: string
	description: string
	parentCategoryId?: string
}

export interface ICategoryList {
	categories: ICategory[]
	className?: string
	isFooter?: boolean
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

export interface IProductVariant {
	name: string
	price: number
	unitsInStock: number
}

export interface IProduct {
	id: string
	name: string
	slug: string
	description: string
	productVariants: IProductVariant[]
	discountId: string
	isSeasonal: string
	categoryId: string
	categoryName: string
	sku: string
	imageUrls: string[]
}

export interface IProductSection {
	title: string
	highlight?: string
	products: IProduct[]
	categories: ICategory[]
	linkLabel: string
	linkHref: string
}

export interface IProductFilters {
	categories: ICategory[]
	activeCategory: string
	activeSubcategory: string
}

export interface IFilterSelectGroup {
	categories: ICategory[]
	activeCategory: string
	activeSubcategory: string
}

export interface IProductGrid {
	products: IProduct[]
	categories: ICategory[]
}

export interface IProductCard {
	product: IProduct
	categories: ICategory[]
}

export interface IBreadcrumbs {
	categories: ICategory[]
	products: IProduct[]
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

export interface IInputProps {
	text: string
}

export interface ISelectProps {
	options: ICategory[]
	variant: 'cat' | 'subcat' | 'sort'
	defaultValue: string
	onSelect?: (id: string) => void
	activeSlug?: string
	activeId?: string
}

export interface ITooltipProps {
	content: string | React.ReactNode
	children: React.ReactNode
	isShoppingBag?: boolean
	className?: string
}
