import { Swiper as SwiperType } from 'swiper/types'

export interface IMainImage {
	images: string[]
	selectedImageIndex: number
	onClick: () => void
	productName: string
}
export interface IThumbnail {
	img: string
	index: number
	productName: string
	selectedImageIndex: number
	onClick: () => void
	isModal: boolean
}
export interface IThumbnailScroller {
	images: string[]
	productName: string
	selectedImageIndex: number
	onSelect: (index: number) => void
	setSwiperRef: (swiper: SwiperType) => void
}
export interface IImageModal {
	isOpen: boolean
	onClose: () => void
	images: string[]
	productName: string
	selectedImageIndex: number
	onSelect: (i: number) => void
	onPrev: () => void
	onNext: () => void
}
