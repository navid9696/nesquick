'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Divide as Hamburger } from 'hamburger-react'
import {
	ArrowDropDown,
	ArrowLeft,
	FavoriteBorderOutlined,
	HomeOutlined,
	LocalMoviesOutlined,
	Logout,
	LogoutOutlined,
	MovieCreationOutlined,
	Search,
	SearchOutlined,
} from '@mui/icons-material'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import SearchInput from './SearchInput'
import { useOutsideClick } from '@hooks/useOutsideClick'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
	const [userMenu, setUserMenu] = useState<boolean>(false)
	const [categoryOpen, setCategoryOpen] = useState<boolean>(false)
	const [top, setTop] = useState<boolean>(true)
	const [showSearch, setShowSearch] = useState<boolean>(false)
	const { data: session } = useSession()

	const ref = useOutsideClick(() => {
		setShowSearch(false)
	})

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

	useEffect(() => {
		const handleDocumentKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setShowSearch(false)
			}
		}

		document.addEventListener('keydown', handleDocumentKeyDown)

		return () => {
			document.removeEventListener('keydown', handleDocumentKeyDown)
		}
	}, [])

	return (
		<>
			<nav
				className={`px-2 py-1 md:px-12 sm:py-6 flex text-slate-50 sticky top-0 z-40 ${
					!top && `bg-gradient-to-b bg-gradient  from-black/85  from-85% `
				}`}>
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
							<DropdownItem endContent={<HomeOutlined />} href='/' textValue='HOME' key='HOME'>
								<strong>HOME</strong>
							</DropdownItem>
							<DropdownItem
								endContent={<MovieCreationOutlined />}
								href='/series'
								textValue='Series'
								key='search'
								title='Series'></DropdownItem>
							<DropdownItem
								endContent={<LocalMoviesOutlined />}
								href='/movies'
								textValue='Movies'
								key='favorite'
								title='Movies'></DropdownItem>
						</DropdownMenu>
					</Dropdown>

					<Link href={'/'} aria-label='To home page'>
						<Image
							src={'/assets/logo.png'}
							alt='logo'
							width='0'
							height='0'
							sizes='100vw'
							className='w-auto  max-h-16'
						/>
					</Link>

					<Link
						className='ml-1 p-2 sm:block hidden font-bold text-slate-50 hover:text-slate-300 transition'
						href={'/'}
						aria-label='HOME'>
						HOME
					</Link>

					<Dropdown onClose={() => handleMenuClick('category')} shouldCloseOnInteractOutside={e => true}>
						<DropdownTrigger>
							<Button
								disableRipple
								className='ml-1 sm:block hidden font-semibold text-slate-50 bg-transparent'
								onClick={() => handleMenuClick('category')}>
								Browse {categoryOpen ? <ArrowDropDown /> : <ArrowLeft />}
							</Button>
						</DropdownTrigger>
						<DropdownMenu aria-label='Static Actions'>
							<DropdownItem
								endContent={<MovieCreationOutlined />}
								href='/series'
								textValue='Series'
								key='search'
								title='Series'></DropdownItem>
							<DropdownItem
								endContent={<LocalMoviesOutlined />}
								href='/movies'
								textValue='Movies'
								key='favorite'
								title='Movies'></DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
				<div className='flex  w-[50%]  lg:w-[35%] 2xl:w-[25%]  justify-between items-center'>
					<Button
						onClick={() => {
							setShowSearch(!showSearch)
						}}
						className='p-2 hidden sm:flex mr-2  items-center '
						isIconOnly
						aria-label='Search'>
						<SearchOutlined sx={{ fontSize: 40 }} />
					</Button>

					<Link
						className='p-[1px] hidden sm:flex rounded-2xl  text-black  bg-[#DD202D]'
						href={'/favorites'}
						aria-label='Favorite'>
						<FavoriteBorderOutlined sx={{ fontSize: 40 }} />
					</Link>

					<Dropdown onClose={() => handleMenuClick('user')} shouldCloseOnInteractOutside={e => true}>
						<DropdownTrigger>
							<Button
								aria-label='User Menu'
								disableRipple
								className=' ml-auto sm:ml-0 font-semibold text-slate-50 bg-transparent'
								onClick={() => handleMenuClick('user')}>
								<Image className='p-1 rounded-2xl ' src={'/assets/profile.png'} alt='profile' height={50} width={50} />
								<span>
									{session?.user?.email?.split('@')[0]} {userMenu ? <ArrowDropDown /> : <ArrowLeft />}
								</span>
							</Button>
						</DropdownTrigger>
						<DropdownMenu aria-label='Static Actions'>
							<DropdownItem
								endContent={<Search />}
								textValue='Search'
								onClick={() => {
									setShowSearch(!showSearch)
								}}
								className='sm:hidden '
								key='search'
								title='Search'></DropdownItem>
							<DropdownItem
								endContent={<FavoriteBorderOutlined />}
								textValue='Favorites'
								className='sm:hidden'
								key='favorite'
								href='/favorites'
								title='Favorites'></DropdownItem>
							<DropdownItem
								onClick={() => {
									signOut({ callbackUrl: '/authorize' })
								}}
								endContent={<LogoutOutlined />}
								textValue='Log out'
								key='logout'
								className='text-[#DD202D]'
								color='danger'>
								<strong>Log Out</strong>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</nav>
			<div
				onKeyDown={e => {
					if (e.key === 'Escape') {
						setShowSearch(false)
					}
				}}
				ref={ref}>
				{showSearch && <SearchInput />}
			</div>
		</>
	)
}

export default Navbar
