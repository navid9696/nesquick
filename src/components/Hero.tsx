'use client'
import Image from 'next/image'
import { baseImgUrl } from '../../lib/constants'
import { IGenres, IMovie } from '../../lib/types'
import { Button, NextUIProvider } from '@nextui-org/react'
import { InfoRounded, PlayArrowOutlined } from '@mui/icons-material'

interface HeroProps {
	urlCategory: IMovie
	genres: IGenres[]
}

const Hero = ({ urlCategory, genres }: HeroProps) => {
	const genreNames = urlCategory?.genre_ids
		.map(genreId => {
			const genre = genres.find(genre => genre.id === genreId)
			return genre ? genre.name : ''
		})
		.join(' | ')
	return (
		<NextUIProvider>
			<div className='flex -mt-[62px] h-screen flex-col justify-end sm:justify-start  items-center sm:items-start  max-w-2xl'>
				<div className='absolute top-0 left-0 -z-10 h-screen w-screen'>
					<Image
						className='object-cover h-full w-full md:hidden'
						alt='poster'
						fill
						src={`${baseImgUrl}${urlCategory?.poster_path}`}
					/>
					<Image
						className='object-cover h-full w-full hidden md:block'
						alt='poster'
						fill
						src={`${baseImgUrl}${urlCategory?.backdrop_path}`}
					/>
					<div className='absolute inset-0 bg-gradient-to-b bg-gradient from-black via-transparent to-black'></div>
				</div>
				<div className='flex flex-col items-center sm:items-start px-10 pb-28 sm:pt-44 gap-5 sm:gap-12 max-w-2xl'>
					<h1 className='text-center font-bold text-4xl sm:text-5xl text-slate-50'>
						{urlCategory?.title || urlCategory?.name}
					</h1>
					<p className=' hidden sm:block text-white'>{urlCategory?.overview}</p>
					<p className='text-center sm:hidden text-white'>{genreNames}</p>

					<div className='flex gap-8'>
						<Button className='bg-[#DD202D] font-extrabold border-2 border-solid border-black'>
							<PlayArrowOutlined sx={{ fontSize: 44 }} />
							Play
						</Button>
						<Button className='border-2 border-solid border-black'>
							<InfoRounded />
							<span className='sm:block hidden font-extrabold'>More Info</span>
							<span className='sm:hidden font-extrabold'>Info</span>
						</Button>
					</div>
				</div>
			</div>
		</NextUIProvider>
	)
}

export default Hero
