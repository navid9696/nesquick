'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Divide as Hamburger } from 'hamburger-react'
import { ArrowDropDown, ArrowLeft, FavoriteBorderOutlined, SearchOutlined } from '@mui/icons-material'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, NextUIProvider } from '@nextui-org/react'
import { useState } from 'react'

const Navbar = () => {
	const [userMenu, setUserMenu] = useState<boolean>(false)
	const [categoryOpen, setCategoryOpen] = useState<boolean>(false)

	const handleMenuClick = (menuType: string) => {
		if ((menuType === 'user' && !categoryOpen) || (menuType === 'category' && !userMenu)) {
			setTimeout(() => {
				if (menuType === 'user') {
					setUserMenu(!userMenu)
				} else if (menuType === 'category') {
					setCategoryOpen(!categoryOpen)
				}
			}, 0)
		}
	}

	return (
		<NextUIProvider>
			<nav className='sticky top-0 z-50 px-2 py-1 sm:px-12 sm:py-6 flex text-slate-50'>
				<div className='flex flex-1 items-center'>
					<Dropdown onClose={() => handleMenuClick('category')} shouldCloseOnInteractOutside={e => true}>
						<DropdownTrigger>
							<button className='sm:hidden mr-2 '>
								<Hamburger
									toggled={categoryOpen}
									toggle={() => handleMenuClick('category')}
									label='Show menu'
									color='#fff'
									size={28}
								/>
							</button>
						</DropdownTrigger>
						<DropdownMenu aria-label='Static Actions'>
							<DropdownItem key='search'>
								<Link href={'/series'}>Series</Link>
							</DropdownItem>
							<DropdownItem key='favorite'>
								<Link href={'/movies'}>Movies</Link>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>

					<Link href={'/'}>
						<Image priority src={'/assets/logo.png'} alt='logo' height={50} width={150} />
					</Link>
				</div>
				<div className='flex sm:flex-initial w-[50%] md:w-[45%] lg:w-[35%] xl:w-[25%] 2xl:w-[20%] justify-between items-center'>
					<Link className='p-2 hidden sm:flex' href={'/search'}>
						<Button className='mr-2 flex flex-1 items-center ' isIconOnly aria-label='Search'>
							<SearchOutlined sx={{ fontSize: 40 }} />
						</Button>
					</Link>
					<Link className='p-2 hidden sm:flex' href={'/favorites'}>
						<Button className='flex items-center' isIconOnly color='danger'>
							<FavoriteBorderOutlined sx={{ fontSize: 40 }} />
						</Button>
					</Link>

					<Dropdown onClose={() => handleMenuClick('user')} shouldCloseOnInteractOutside={e => true}>
						<DropdownTrigger>
							<Button
								disableRipple
								className='flex items-center ml-auto sm:ml-0 text-slate-50 bg-transparent'
								onClick={() => handleMenuClick('user')}>
								<Image className='p-1 rounded-2xl ' src={'/assets/profile.png'} alt='profile' height={50} width={50} />
								User {userMenu ? <ArrowDropDown /> : <ArrowLeft />}
							</Button>
						</DropdownTrigger>
						<DropdownMenu aria-label='Static Actions'>
							<DropdownItem className='sm:hidden' key='search'>
								<Link href={'/search'}>Search</Link>
							</DropdownItem>
							<DropdownItem className='sm:hidden' key='favorite'>
								<Link href={'/favorites'}>Favorites</Link>
							</DropdownItem>
							<DropdownItem key='logout' className='text-danger' color='danger'>
								<Link href={'/login'}>
									<strong>Log out</strong>
								</Link>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</nav>
		</NextUIProvider>
	)
}

export default Navbar
