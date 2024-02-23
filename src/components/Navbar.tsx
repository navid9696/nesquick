'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Divide as Hamburger } from 'hamburger-react'
import { ArrowDropDown, ArrowLeft, FavoriteOutlined, FavoriteBorderOutlined, SearchOutlined } from '@mui/icons-material'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, NextUIProvider } from '@nextui-org/react'
import { useState } from 'react'
import { useOutsideClick } from '@hooks/useOutsideClick'

const Navbar = () => {
	const [userMenu, setUserMenu] = useState<boolean>(true)
	const [categoryOpen, setCategoryOpen] = useState<boolean>(false)

	const handleUserMenu = () => {
		setUserMenu(!userMenu)
	}
const ref = useOutsideClick()=>{
	
}
	return (
		<NextUIProvider>
			<nav className='px-2 py-1 sm:px-12 sm:py-6 flex text-slate-50'>
				<div className='flex flex-1 items-center'>
					<Dropdown shouldCloseOnInteractOutside={e => true}>
						<DropdownTrigger>
							<button className='sm:hidden mr-2 '>
								<Hamburger toggled={categoryOpen} toggle={setCategoryOpen} label='Show menu' color='#fff' size={28} />
							</button>
						</DropdownTrigger>
						<DropdownMenu aria-label='Static Actions'>
							<DropdownItem key='search'>Search</DropdownItem>
							<DropdownItem key='favorite'>Favorite</DropdownItem>
							<DropdownItem key='logout' className='text-danger' color='danger'>
								Log out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>

					<Link className='' href={'/'}>
						<Image src={'/assets/logo.png'} alt='logo' height={50} width={150} />
					</Link>
				</div>
				<div className='flex sm:flex-initial w-[50%] md:w-[45%] lg:w-[35%] xl:w-[25%] 2xl:w-[20%] justify-between items-center'>
					<Link className='p-2 hidden sm:flex' href={'/search'}>
						<Button className='flex flex-1 items-center ' isIconOnly aria-label='Search'>
							<SearchOutlined sx={{ fontSize: { xs: 34, sm: 38, md: 42, lg: 46 } }} />
						</Button>
					</Link>
					<Link className='p-2 hidden sm:flex' href={'/favorite'}>
						<Button className='flex items-center' isIconOnly color='danger'>
							<FavoriteBorderOutlined sx={{ fontSize: { xs: 34, sm: 38, md: 42, lg: 46 } }} />
						</Button>
					</Link>

					<Dropdown onClose={handleUserMenu} shouldCloseOnInteractOutside={e => true}>
						<DropdownTrigger>
							<Button
								className='flex items-center ml-auto sm:ml-0 text-slate-50 bg-transparent'
								onClick={handleUserMenu}>
								<Image
									className='p-1 mr-1 rounded-2xl '
									src={'/assets/profile.png'}
									alt='profile'
									height={50}
									width={50}
								/>
								User {userMenu ? <ArrowLeft /> : <ArrowDropDown />}
							</Button>
						</DropdownTrigger>
						<DropdownMenu aria-label='Static Actions'>
							<DropdownItem key='search'>Search</DropdownItem>
							<DropdownItem key='favorite'>Favorite</DropdownItem>
							<DropdownItem key='logout' className='text-danger' color='danger'>
								Log out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</nav>
		</NextUIProvider>
	)
}

export default Navbar
