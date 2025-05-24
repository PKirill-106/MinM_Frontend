'use client'

import Modal from '@/components/UI/Modal'
import { IProductTopLeftProps } from '@/types/Interfaces'
import {
	ChevronLeft,
	ChevronRight,
	CircleArrowLeft,
	CircleArrowRight,
} from 'lucide-react'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'

const images = [
	'/M-in-M-GP-7.5.jpg',
	'/prod/M-in-M-Cover-Base.jpg',
	'/prod/M-in-M-Cover-Base-1.jpg',
	'/prod/M-in-M-Cover-Base-2.jpg',
	'/prod/M-in-M-Cover-Base-3.jpg',
	'/prod/M-in-M-Cover-Base-4.jpg',
	'/prod/M-in-M-Cover-Base-5.jpg',
]

const VISIBLE_COUNT = 5

export default function ProductTopLeft({ product }: IProductTopLeftProps) {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const computeScrollIndex = useCallback((index: number) => {
		if (images.length <= VISIBLE_COUNT) return 0
		const half = Math.floor(VISIBLE_COUNT / 2)
		return Math.min(Math.max(0, index - half), images.length - VISIBLE_COUNT)
	}, [])

	const scrollIndex = useMemo(
		() => computeScrollIndex(selectedImageIndex),
		[selectedImageIndex, computeScrollIndex]
	)

	const visibleImages = useMemo(
		() => images.slice(scrollIndex, scrollIndex + VISIBLE_COUNT),
		[scrollIndex]
	)

	const openModal = useCallback((index: number) => {
		setSelectedImageIndex(index)
		setIsModalOpen(true)
	}, [])

	const navigateImage = useCallback((direction: 'prev' | 'next') => {
		setSelectedImageIndex(prev => {
			const newIndex =
				direction === 'next'
					? Math.min(prev + 1, images.length - 1)
					: Math.max(prev - 1, 0)
			return newIndex
		})
	}, [])

	const renderThumbnail = (img: string, index: number) => {
		const isActive = selectedImageIndex === index
		return (
			<div
				key={img}
				className={`relative aspect-square w-18 rounded-md overflow-hidden transition-all duration-200 ${
					isActive ? 'ring-2 ring-accent' : 'hover:brightness-80 opacity-100'
				} cursor-pointer`}
				onClick={() => setSelectedImageIndex(index)}
			>
				<Image
					src={img}
					alt={`${product.name} thumbnail ${index}`}
					fill
					sizes='64px'
					className={`object-cover transition-all duration-300 ${
						isActive ? 'brightness-90' : ''
					}`}
				/>
			</div>
		)
	}

	return (
		// main image
		<div className='flex flex-col gap-4'>
			<div
				onClick={() => openModal(selectedImageIndex)}
				className='relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer'
			>
				{images.map((img, i) => (
					<Image
						key={img}
						src={img}
						alt={product.name}
						fill
						className={`object-cover absolute top-0 left-0 transition-opacity duration-300 ${
							selectedImageIndex === i ? 'opacity-100' : 'opacity-0'
						}`}
					/>
				))}
			</div>

			{/* image list */}
			<div className='relative flex gap-2 justify-center items-center'>
				<button
					onClick={() => navigateImage('prev')}
					disabled={selectedImageIndex === 0}
					className={`disabled:opacity-30 ${
						selectedImageIndex !== 0 ? 'li-hover' : ''
					}`}
				>
					<CircleArrowLeft className='h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8' />
				</button>
				<div className='flex-1 flex justify-center gap-2'>
					{visibleImages.map((img, i) => renderThumbnail(img, scrollIndex + i))}
				</div>
				<button
					onClick={() => navigateImage('next')}
					disabled={selectedImageIndex >= images.length - 1}
					className={`disabled:opacity-30 ${
						selectedImageIndex < images.length - 1 ? 'li-hover' : ''
					}`}
				>
					<CircleArrowRight className='h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8' />
				</button>
			</div>

			{/* modal */}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className='relative flex flex-col items-center gap-4 px-4'>
					<div className='relative w-full aspect-square flex items-center justify-center'>
						<button
							onClick={() => navigateImage('prev')}
							disabled={selectedImageIndex === 0}
							className={`absolute -left-20 top-0 bottom-0 z-20 px-6 h-full disabled:opacity-30  ${
								selectedImageIndex !== 0 ? 'li-hover' : ''
							}`}
						>
							<ChevronLeft className='link-size' />
						</button>
						<div className='relative aspect-square w-full'>
							<Image
								src={images[selectedImageIndex]}
								alt='Zoomed view'
								fill
								className='object-contain'
							/>
						</div>
						<button
							onClick={() => navigateImage('next')}
							disabled={selectedImageIndex >= images.length - 1}
							className={`absolute -right-20 top-0 bottom-0 z-20 px-6 h-full disabled:opacity-30  ${
								selectedImageIndex < images.length - 1 ? 'li-hover' : ''
							}`}
						>
							<ChevronRight className='link-size' />
						</button>
					</div>
					<div className='flex gap-2 mt-4'>
						{visibleImages.map((img, i) =>
							renderThumbnail(img, scrollIndex + i)
						)}
					</div>
				</div>
			</Modal>
		</div>
	)
}
