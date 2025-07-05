import { Button } from '@/components/UI/button'
import {
	Sidebar,
	SidebarGroup,
	SidebarMenuButton,
	SidebarProvider
} from '@/components/UI/sidebar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)
	if (!session || session.user.role !== 'Admin') {
		return <p>У вас немає доступу</p>
	}
	const accessToken = (session as any)?.user.accessToken as string
	const refreshToken = (session as any)?.user.refreshToken as string
  const expiresAt = (session as any)?.user.expiresAt as string
	// const handleLogout = (accessToken, refreshToken) => {

	// }

	return(
		<SidebarProvider>
			<div className='container flex gap-10 md:grid md:grid-cols-4'>
				<Sidebar className='md:col-span-1'>
					<SidebarGroup title='Admin Menu'>
						<SidebarMenuButton asChild className='border-1'>
							<Link href='/admin/products'>Продукти</Link>
						</SidebarMenuButton>
						<SidebarMenuButton asChild className='p-2 border-1'>
							<Link href='/admin/seasons'>Сезони</Link>
						</SidebarMenuButton>
						<SidebarMenuButton asChild className='p-2 border-1'>
							<Link href='/admin/discounts'>Знижки</Link>
						</SidebarMenuButton>
						{/* <SidebarMenuButton asChild className='p-2 border-1'>
							<Button onClick={() => handleLogout(accessToken)}>Вийти з акаунту</Button>
						</SidebarMenuButton> */}
					</SidebarGroup>
				</Sidebar>
				<main className='md:col-span-3'>{children}</main>
			</div>
		</SidebarProvider>
	)
}
