import React from 'react'
import { IImageUploader } from '../interface'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Button } from '@/components/UI/button'
import SortableImage from './SortableImage'

export default function ImageUploader({
	images,
	onDragEnd,
	onRemove,
	onFileChange,
	fileInputRef,
	sensors,
}: IImageUploader) {
	return (
		<div>
			<span className='block mb-2'>Зображення продукту</span>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={onDragEnd}
			>
				<SortableContext
					items={images.map(i => i.filePath)}
					strategy={verticalListSortingStrategy}
				>
					<div className='flex gap-2 overflow-x-auto py-2'>
						{images.map(img => (
							<SortableImage
								key={img.filePath}
								file={img}
								onRemove={() => onRemove(img.filePath)}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
			<div className='mt-4'>
				<Button
					variant='outline'
					size='sm'
					type='button'
					onClick={() => fileInputRef.current?.click()}
				>
					+ Додати зображення
				</Button>
				<input
					ref={fileInputRef}
					type='file'
					accept='image/*'
					multiple
					onChange={onFileChange}
					className='hidden'
				/>
			</div>
		</div>
	)
}
