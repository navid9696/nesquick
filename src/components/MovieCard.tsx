import React from 'react'
import { IMovie } from '../../lib/types'
import { baseImgUrl } from '../../lib/constants'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { fetchTrailers } from '../../actions/movieData'

const MovieCard = ({ movie }: { movie: IMovie }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	

	

	return (
		<>
			<div className='relative min-w-[194px] h-72 my-10 cursor-pointer' onClick={onOpen}>
				<Image
					className='object-contain rounded-lg transition  hover:scale-105 hover:outline hover:outline-white hover:outline-3 '
					alt='poster'
					width={200}
					height={0}
					src={`${baseImgUrl}${movie?.poster_path}`}
				/>
			</div>{' '}
			<Modal placement='top-center' backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>{movie?.title || movie?.name}</ModalHeader>
							<ModalBody>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit
									venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit
									venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
								<p>
									Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit
									dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris
									do dolor eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem
									eiusmod et. Culpa deserunt nostrud ad veniam.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='light' onPress={onClose}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default MovieCard
