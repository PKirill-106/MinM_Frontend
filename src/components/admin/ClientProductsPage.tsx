'use client'
import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '@/lib/services/categoryServices'
import { ICategory } from '@/types/Interfaces'
import { ArrowRight, Pencil } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../UI/button'
import CategoryModal from './modal/category-modal/CategoryModal'
import AlertOnDelete from './AlertOnDelete'

interface Props {
	categories: ICategory[]
}

export default function ClientProductsPage({ categories }: Props) {
	const [isModalOpen, setModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'create' | 'update'>('create')
	const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)
	const [deleteOption, setDeleteOption] = useState<
		'CascadeDelete' | 'ReassignToParent' | 'Orphan' | null
	>(null)

	const openCreate = () => {
		setModalType('create')
		setEditingCategory(null)
		setModalOpen(true)
	}

	const openEdit = (prod: ICategory) => {
		setModalType('update')
		setEditingCategory(prod)
		setModalOpen(true)
	}

	const closeModal = () => setModalOpen(false)

	const { data: session } = useSession()
	const accessToken = (session as any)?.accessToken as string

	const handleSubmitCategory = useCallback(
		async (formData: FormData, token: string) => {
			if (!token) {
				console.error('No access token available')
				return
			}

			try {
				if (modalType === 'create') {
					await createCategory(formData, token)
				} else {
					await updateCategory(formData, token)
				}
				setModalOpen(false)
				toast.success(
					`Категорію ${modalType === 'create' ? 'створено' : 'оновлено'}`
				)
			} catch (err) {
				toast.error('Сталася помилка')
				console.error('Submit failed:', err)
			}
		},
		[modalType]
	)

	const handleDeleteCategory = async (categoryId: string, token: string) => {
		try {
			const payload = {
				categoryId,
				option: deleteOption ?? 'CascadeDelete',
			}
			await deleteCategory(payload, token)
			toast.success('Категорію видалено')
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('Delete failed:', err)
		}
	}

	return (
		<div className='flex flex-col w-full'>
			<h1 className='mb-10'>Категорії</h1>
			<div className='flex flex-col items-center max-w-md'>
				{categories ? (
					<ul className='space-y-2 w-full'>
						{categories.map(cat => (
							<li key={cat.id} className='w-full'>
								<div className='w-full flex items-center'>
									<Link href={`/admin/products/${cat.slug}`} className='flex-1'>
										<div className='flex justify-between p-4 w-full max-w-md border-1 border-transparent-text rounded-md hover:text-accent group'>
											{cat.name}
											<ArrowRight className='group-hover:translate-x-2 transition-all duration-300' />
										</div>
									</Link>
									<Button
										variant='outline'
										size='icon'
										className='text-accent hover:bg-muted ml-4 p-2 rounded-sm'
										onClick={() => openEdit(cat)}
										title='Редагувати категорію'
									>
										<Pencil size={18} />
									</Button>
									<AlertOnDelete
										onClick={() => handleDeleteCategory(cat.id, accessToken)}
										name={cat.name}
										setDeleteOption={setDeleteOption}
									/>
								</div>
							</li>
						))}
					</ul>
				) : (
					<h3>Немає жодної категорії</h3>
				)}

				<Button className='mt-4 w-full rounded-md' onClick={openCreate}>
					+
				</Button>
			</div>

			<CategoryModal
				type={modalType}
				isOpen={isModalOpen}
				onClose={closeModal}
				onSubmit={handleSubmitCategory}
				accessToken={accessToken}
				categoryData={editingCategory || undefined}
				categories={categories}
			/>
		</div>
	)
}
