'use client'

import { IProductTopLeftProps } from '@/types/Interfaces'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { Swiper as SwiperType } from 'swiper/types'
import ImageModal from './ImageModal'
import MainImage from './MainImage'
import ThumbnailScroller from './ThumbnailScroller'

const images = [
	'/M-in-M-GP-7.5.jpg',
	'/prod/M-in-M-Cover-Base.jpg',
	'/prod/M-in-M-Cover-Base-1.jpg',
	'/prod/M-in-M-Cover-Base-2.jpg',
	'/prod/M-in-M-Cover-Base-3.jpg',
	'/prod/M-in-M-Cover-Base-4.jpg',
	'/prod/M-in-M-Cover-Base-5.jpg',
]

export default function ProductTopLeft({ product }: IProductTopLeftProps) {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const swiperRef = useRef<SwiperType | null>(null)

	const openModal = useCallback((index: number) => {
		setSelectedImageIndex(index)
		setIsModalOpen(true)
	}, [])

	const handlePrev = () => {
		if (selectedImageIndex > 0) {
			const newIndex = selectedImageIndex - 1
			setSelectedImageIndex(newIndex)
			swiperRef.current?.slideTo(newIndex)
		}
	}

	const handleNext = () => {
		if (selectedImageIndex < images.length - 1) {
			const newIndex = selectedImageIndex + 1
			setSelectedImageIndex(newIndex)
			swiperRef.current?.slideTo(newIndex)
		}
	}

	const circleArrowClass = 'h-8 w-8 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8'

	return (
		<div className='flex flex-col gap-4 md:gap-3'>
			<MainImage
				images={images}
				selectedImageIndex={selectedImageIndex}
				onClick={() => openModal(selectedImageIndex)}
				productName={product.name}
			/>

			<div className='relative flex gap-1 xl:gap-2 justify-between items-center'>
				<button
					onClick={handlePrev}
					disabled={selectedImageIndex === 0}
					className={`shrink-0 disabled:opacity-30 ${
						selectedImageIndex !== 0 ? 'li-hover' : ''
					}`}
				>
					<CircleArrowLeft className={circleArrowClass} />
				</button>

				<ThumbnailScroller
					images={images}
					productName={product.name}
					selectedImageIndex={selectedImageIndex}
					onSelect={setSelectedImageIndex}
					setSwiperRef={swiper => (swiperRef.current = swiper)}
				/>

				<button
					onClick={handleNext}
					disabled={selectedImageIndex >= images.length - 1}
					className={`shrink-0 disabled:opacity-30 ${
						selectedImageIndex < images.length - 1 ? 'li-hover' : ''
					}`}
				>
					<CircleArrowRight className={circleArrowClass} />
				</button>
			</div>

			<ImageModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				images={images}
				productName={product.name}
				selectedImageIndex={selectedImageIndex}
				onSelect={setSelectedImageIndex}
				onPrev={handlePrev}
				onNext={handleNext}
			/>
		</div>
	)
}
