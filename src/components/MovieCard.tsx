'use client'
import { IGenres, IMovie } from '../../lib/types'
import { baseImgUrl } from '../../lib/constants'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import BodyModal from './BodyModal'

interface Props {
	movie?: IMovie
	genres?: IGenres[]
	type?: string
}

const MovieCard = ({ movie, genres, type }: Props) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			{movie?.poster_path && (
				<div className='relative min-w-[194px] h-72 my-3 cursor-pointer' onClick={onOpen}>
					<Image
						className='h-full  rounded-lg transition hover:scale-105 hover:outline hover:outline-white hover:outline-3 '
						alt='poster'
						width={200}
						height={0}
						src={`${baseImgUrl}${movie?.poster_path}`}
					/>
				</div>
			)}
			<Modal
				className='pb-1 z-50 xl:self-center'
				hideCloseButton
				placement='bottom-center'
				scrollBehavior='outside'
				backdrop='blur'
				isOpen={isOpen}
				onOpenChange={onOpenChange}>
				<ModalContent className='bg-black '>
					{onClose => <BodyModal onClose={onClose} movie={movie} genres={genres} type={type} />}
				</ModalContent>
			</Modal>
		</>
	)
}

export default MovieCard
