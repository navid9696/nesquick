'use client'
import Image from 'next/image'
import { baseImgUrl } from '../../lib/constants'
import { IMovie } from '../../lib/types'
import { Button, NextUIProvider } from '@nextui-org/react'
import { InfoRounded, PlayArrowOutlined } from '@mui/icons-material'

const Hero = ({ urlCategory }: { urlCategory: IMovie }) => {
	return (
		<NextUIProvider>
			<div className='h-screen -mt-[180px] sm:mt-0 flex flex-col justify-end sm:justify-start  items-center sm:items-start px-10 pt-20 gap-10 max-w-2xl'>
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
				<h1 className='font-bold text-4xl sm:text-5xl text-slate-50'>{urlCategory?.title || urlCategory?.name}</h1>
				<p className='hidden sm:block text-white'>{urlCategory?.overview}</p>
				<div className='flex gap-8'>
					<Button className='bg-red-700'>
						<PlayArrowOutlined sx={{ fontSize: 40 }} />
						Play
					</Button>
					<Button>
						<InfoRounded />
					</Button>
				</div>
			</div>
		</NextUIProvider>
	)
}

export default Hero
