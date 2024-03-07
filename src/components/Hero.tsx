'use client'
import Image from 'next/image'
import { baseImgUrl } from '../../lib/constants'
import { IGenres, IMovie } from '../../lib/types'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, NextUIProvider, useDisclosure } from '@nextui-org/react'
import { InfoRounded, PlayArrowOutlined } from '@mui/icons-material'
import YTEmbed from './YTEmbed'

interface HeroProps {
	urlCategory: IMovie
	genres: IGenres[]
}

const Hero = ({ urlCategory, genres }: HeroProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const genreNames = urlCategory?.genre_ids
		.map(genreId => {
			const genre = genres.find(genre => genre.id === genreId)
			return genre ? genre.name : ''
		})
		.join(' | ')
	return (
		<div className='flex -mt-[62px] h-screen w-full flex-col justify-end sm:justify-start  items-center sm:items-start bg-black/50  '>
			<div className='absolute top-0 left-0 b -z-10 h-screen w-screen '>
				<Image
					className='object-cover h-full  w-full md:hidden'
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
			<div className=' flex flex-col items-center sm:items-start px-16 pb-28 sm:pt-44 gap-5 sm:gap-12 max-w-2xl'>
				<h1 className='text-center font-bold text-4xl sm:text-5xl text-slate-50'>
					{urlCategory?.title || urlCategory?.name}
				</h1>
				<p className=' hidden sm:block text-white'>{urlCategory?.overview}</p>
				<p className='text-center sm:hidden text-white'>{genreNames}</p>

				<div className='flex gap-8'>
					<Button onClick={onOpen} className='bg-[#DD202D] font-extrabold border-2 border-solid border-black'>
						<PlayArrowOutlined sx={{ fontSize: 44 }} />
						Play
					</Button>
					<Button onClick={onOpen} className='border-2 border-solid border-black'>
						<InfoRounded />
						<span className='sm:block hidden font-extrabold'>More Info</span>
						<span className='sm:hidden font-extrabold'>Info</span>
					</Button>
					<Modal
						className='pb-1 z-50 xl:self-center'
						hideCloseButton
						placement='bottom-center'
						scrollBehavior='outside'
						backdrop='blur'
						isOpen={isOpen}
						onOpenChange={onOpenChange}>
						<ModalContent className='bg-black '>
							{onClose => (
								<>
									<ModalBody>
										<div className='mt-3 overflow-hidden '>
											<YTEmbed />
										</div>
										<div>
											<p className='mt-2 text-zinc-100 font-extrabold'>
												Name:
												<span className='ml-2 text-zinc-200 text-md font-semibold'>
													{urlCategory?.title || urlCategory?.name}
												</span>
											</p>
											<p className='mt-2 text-zinc-100 font-extrabold'>
												Release Date:
												<span className='ml-2 text-zinc-200 text-md font-semibold'>
													{urlCategory?.first_air_date || urlCategory?.release_date}{' '}
												</span>
											</p>
											<p className='mt-2 text-xs text-zinc-300 ml-2'>{urlCategory?.overview}</p>

											<p className='mt-2 text-zinc-100 font-extrabold'>
												Rating:
												<span className='ml-2 text-zinc-200 text-sm font-semibold'>
													{urlCategory?.vote_average.toFixed(1)}
												</span>
											</p>
											<p className='mt-2 text-zinc-100 font-extrabold'>
												Genres:
												<span className='ml-2 text-zinc-200 text-sm font-semibold'>{genreNames}</span>
											</p>
										</div>
									</ModalBody>
									<ModalFooter>
										<Button color='danger' variant='ghost' onPress={onClose}>
											Close
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			</div>
		</div>
	)
}

export default Hero
