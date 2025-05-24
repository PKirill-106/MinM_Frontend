'use client'

import { IModal } from '@/types/Interfaces'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, children }: IModal) {
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose()
			}
		}
		const handleClose = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
			document.addEventListener('keydown', handleClose)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleClose)
		}
	}, [isOpen, onClose])


	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 text-white ${
				isOpen
					? 'visible'
					: 'invisible pointer-events-none'
			}`}
		>
			<div
				ref={modalRef}
				className={`max-w-3xl w-full z-10 duration-300 ease-out transition-all ${
					isOpen
						? 'opacity-100 scale-100 translate-x-0 translate-y-0 visible'
						: 'opacity-0 scale-80 -translate-x-20 -translate-y-20 invisible'
				}`}
			>
				<button
					onClick={onClose}
					className='absolute z-20 -top-25 -right-20 p-9 li-hover cursor-pointer'
				>
					<X className='link-size' />
				</button>

				{children}
			</div>
		</div>
	)
}
