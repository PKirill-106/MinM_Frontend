'use client'
import { ISelectProps } from '@/types/Interfaces'
import { ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Select({
	options,
	variant,
	defaultValue,
}: ISelectProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const selectRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	let selectOptions: { id: string; name: string }[] = []

	if (variant === 'cat') {
		selectOptions = options.filter(option => option.parentCategoryId === null)
	} else if (variant === 'subcat') {
		selectOptions = options.filter(option => option.parentCategoryId !== null)
	} else if (variant === 'sort') {
		selectOptions = [
			{ id: 'cheap', name: 'Від дешевих' },
			{ id: 'expensive', name: 'Від дорогих' },
			{ id: 'popular', name: 'Популярні' },
		]
	}

	return (
		<div
			ref={selectRef}
			className='relative p-2 border-1 rounded-md w-[220px] cursor-pointer'
			onClick={() => setIsOpen(prev => !prev)}
		>
			<div className='flex items-center justify-between'>
				<span>{defaultValue}</span>
				<ChevronRight
					className={`h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 transform transition-transform duration-300 ease-out ${
						isOpen ? 'rotate-90' : 'rotate-0'
					}`}
				/>
			</div>

			{isOpen && (
				<div className='absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-md z-10'>
					{selectOptions.map(option => (
						<div
							key={option.id}
							className='px-2 py-1 lg:px-4 lg:py-2 hover:bg-gray-100 cursor-pointer'
							onClick={e => {
								e.stopPropagation()
								setIsOpen(false)
								console.log('Selected:', option.name)
							}}
						>
							{option.name}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
