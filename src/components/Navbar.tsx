'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Divide as Hamburger } from 'hamburger-react'
import { ArrowDropDown, ArrowLeft, FavoriteBorderOutlined, SearchOutlined } from '@mui/icons-material'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, NextUIProvider } from '@nextui-org/react'
import { useState, useEffect } from 'react'

const Navbar = () => {
	const [userMenu, setUserMenu] = useState<boolean>(false)
	const [categoryOpen, setCategoryOpen] = useState<boolean>(false)
	const [top, setTop] = useState(true)

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

	useEffect(() => {
		const scrollHandler = () => {
			window.scrollY > 10 ? setTop(false) : setTop(true)
		}
		window.addEventListener('scroll', scrollHandler)
		return () => window.removeEventListener('scroll', scrollHandler)
	}, [top])

	return (
		<NextUIProvider
			className={`sticky top-0 z-20 ${!top && ` bg-gradient-to-b bg-gradient  from-black/85  from-85%  `}`}>
			<nav className='z-50 px-2 py-1 sm:px-12 sm:py-6 flex text-slate-50'>
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

					<Link href={'#top'}>
						<Image priority src={'/assets/logo.png'} alt='logo' height={50} width={150} />
					</Link>

					<Dropdown onClose={() => handleMenuClick('category')} shouldCloseOnInteractOutside={e => true}>
						<DropdownTrigger>
							<Button
								disableRipple
								className='ml-5 sm:block hidden font-semibold text-slate-50 bg-transparent'
								onClick={() => handleMenuClick('category')}>
								Browse {categoryOpen ? <ArrowDropDown /> : <ArrowLeft />}
							</Button>
						</DropdownTrigger>
						<DropdownMenu aria-label='Static Actions'>
							<DropdownItem key='search'>
								<Link className='font-semibold' href={'/series'}>
									Series
								</Link>
							</DropdownItem>
							<DropdownItem key='favorite'>
								<Link className='font-semibold' href={'/movies'}>
									Movies
								</Link>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
				<div className='flex sm:flex-initial w-[50%] md:w-[45%] lg:w-[35%] xl:w-[25%] 2xl:w-[20%] justify-between items-center'>
					<Link className='p-2 hidden sm:flex' href={'/search'}>
						<Button className='mr-2 flex flex-1 items-center ' isIconOnly aria-label='Search'>
							<SearchOutlined sx={{ fontSize: 40 }} />
						</Button>
					</Link>
					<Link className='p-2 hidden sm:flex' href={'/favorites'}>
						<Button className='flex items-center bg-[#DD202D]' isIconOnly>
							<FavoriteBorderOutlined sx={{ fontSize: 40 }} />
						</Button>
					</Link>

					<Dropdown onClose={() => handleMenuClick('user')} shouldCloseOnInteractOutside={e => true}>
						<DropdownTrigger>
							<Button
								disableRipple
								className='flex items-center ml-auto sm:ml-0 font-semibold text-slate-50 bg-transparent'
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
							<DropdownItem key='logout' className='text-[#DD202D]' color='danger'>
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
