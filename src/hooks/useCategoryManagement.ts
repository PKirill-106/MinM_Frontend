import { useState, useCallback } from 'react'
import { ICategory } from '@/types/Interfaces'
import {
	createCategory,
	updateCategory,
	deleteCategory,
} from '@/lib/services/categoryServices'
import toast from 'react-hot-toast'

export function useCategoryManagement() {
	const [isCategoryModalOpen, setCategoryModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'create' | 'update'>('create')
	const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)
	const [deleteOption, setDeleteOption] = useState<
		'CascadeDelete' | 'ReassignToParent' | 'Orphan' | null
	>(null)

	const openCreateCategory = () => {
		setModalType('create')
		setEditingCategory(null)
		setCategoryModalOpen(true)
	}

	const openEditCategory = (cat: ICategory) => {
		setModalType('update')
		setEditingCategory(cat)
		setCategoryModalOpen(true)
	}

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
				setCategoryModalOpen(false)
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

	return {
		isCategoryModalOpen,
		modalType,
		editingCategory,
		deleteOption,
		openCreateCategory,
		openEditCategory,
		handleSubmitCategory,
		handleDeleteCategory,
		setCategoryModalOpen,
		setDeleteOption,
	}
}
