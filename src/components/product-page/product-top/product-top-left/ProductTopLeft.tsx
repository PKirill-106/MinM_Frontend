'use client'

import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { Swiper as SwiperType } from 'swiper/types'
import ImageModal from './ImageModal'
import MainImage from './MainImage'
import ThumbnailScroller from './ThumbnailScroller'
import { IProductTopLeftProps } from '../../interfaces'

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
		if (selectedImageIndex < product.productImages.length - 1) {
			const newIndex = selectedImageIndex + 1
			setSelectedImageIndex(newIndex)
			swiperRef.current?.slideTo(newIndex)
		}
	}

	const circleArrowClass = 'h-8 w-8 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8'

	return (
		<div>
			<div className='md:sticky md:top-28 md:self-start flex flex-col gap-4 md:gap-3'>
				<MainImage
					images={product.productImages}
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
						images={product.productImages}
						productName={product.name}
						selectedImageIndex={selectedImageIndex}
						onSelect={setSelectedImageIndex}
						setSwiperRef={swiper => (swiperRef.current = swiper)}
					/>

					<button
						onClick={handleNext}
						disabled={selectedImageIndex >= product.productImages.length - 1}
						className={`shrink-0 disabled:opacity-30 ${
							selectedImageIndex < product.productImages.length - 1
								? 'li-hover'
								: ''
						}`}
					>
						<CircleArrowRight className={circleArrowClass} />
					</button>
				</div>
			</div>

			<ImageModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				images={product.productImages}
				productName={product.name}
				selectedImageIndex={selectedImageIndex}
				onSelect={setSelectedImageIndex}
				onPrev={handlePrev}
				onNext={handleNext}
			/>
		</div>
	)
}
