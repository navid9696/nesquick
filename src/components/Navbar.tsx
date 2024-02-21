'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Divide as Hamburger } from 'hamburger-react'
import { ArrowDropDown, ArrowLeft, Favorite, SearchRounded } from '@mui/icons-material'
import { useState } from 'react'
import { useOutsideClick } from '@hooks/useOutsideClick'
import DropDownMenu from './DropDownMenu'

const Navbar = () => {
	const [userMenu, setUserMenu] = useState<boolean>(true)

	const handleUserMenu = () => {
		setUserMenu(!userMenu)
	}

	const ref = useOutsideClick(() => {
		setUserMenu(true)
	})

	return (
		<nav className='px-2 py-1 sm:px-12 sm:py-6 flex text-slate-50'>
			<div className='flex flex-1 items-center'>
				<button className='sm:hidden mr-2 '>
					<Hamburger label='Show menu' color='#fff' size={28} />
				</button>
				<Link className='' href={'/'}>
					<Image src={'/assets/logo.png'} alt='logo' height={50} width={150} />
				</Link>
			</div>
			<div className='flex flex-1 sm:flex-initial sm:w-[35%] items-center'>
				<SearchRounded
					sx={{ fontSize: { xs: 38, sm: 42, md: 46, lg: 50 } }}
					className='p-2 ml-auto transition duration-300 hover:text-slate-300'
				/>
				<Link href={'/favorite'}>
					<Favorite
						sx={{ fontSize: { xs: 38, sm: 42, md: 46, lg: 50 } }}
						className='p-2 ml-auto transition duration-300 hover:text-slate-300'
					/>
				</Link>

				<div
					ref={ref}
					className='ml-auto flex items-center transition duration-300 hover:text-slate-300'
					onClick={handleUserMenu}>
					<Image className='p-1 mr-1 ' src={'/assets/profile.png'} alt='profile' height={50} width={50} />
					<p>User</p>
					{userMenu ? <ArrowLeft /> : <ArrowDropDown />}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
