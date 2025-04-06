'use client'
import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Search = {
	isOpen: boolean
	onClose: () => void
}

export default function SearchBar({ isOpen, onClose }: Search) {
	const searchRef = useRef<HTMLDivElement>(null)
	const [inputValue, setInputValue] = useState('')
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node) &&
				!(event.target as HTMLElement).closest('button.search-toggle')
			) {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, onClose])

	return (
		<div
			ref={searchRef}
			className={`fixed z-9 top-30 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-lg bg-white px-4 py-2 rounded-md shadow-lg focus-within:scale-105 transition-all duration-300 ${
				isOpen
					? 'opacity-100 translate-y-0 scale-100'
					: 'opacity-0 -translate-y-5 scale-85 pointer-events-none'
			}`}
		>
			<input
				type='text'
				placeholder='Що шукаєте?'
				className='w-full bg-transparent outline-none placeholder:transparent-text text-lg peer transition-opacity duration-300'
			/>
			<Search className='text-transparent-text w-5 h-5' />
			<style jsx>{`
				.peer::placeholder {
					opacity: 1;
					transition: opacity 0.3s ease-in-out;
				}
				.peer:focus::placeholder {
					opacity: 0;
				}
			`}</style>
		</div>
	)
}
