'use client'
import Image from 'next/image'
import { baseImgUrl } from '../../lib/constants'
import { IMovie } from '../../lib/types'

const Hero = ({ urlCategory }: { urlCategory: IMovie }) => {
	return (
		<div className='flex flex-col px-10 pt-20 gap-10 max-w-xl'>
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
		</div>
	)
}

export default Hero
