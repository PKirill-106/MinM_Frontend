'use client'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/UI/alert-dialog'
import { Trash } from 'lucide-react'
import { Button } from '../UI/button'
import { IAlertOnDelete } from './interface'
export default function AlertOnDelete({ onClick, pName }: IAlertOnDelete) {
	return (
		<AlertDialog>
			<AlertDialogTrigger className='ml-4 p-2 rounded-sm bg-red-600 text-white shadow-xs hover:bg-destructive/70 cursor-pointer'>
				<Trash />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Ви впевнені, що хочете видалити?</AlertDialogTitle>
					<AlertDialogDescription>
						Ця дія не може бути скасована. Це назавжди видалить '{pName}'.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Скасувати</AlertDialogCancel>
					<AlertDialogAction onClick={onClick}>Так, видалити</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
