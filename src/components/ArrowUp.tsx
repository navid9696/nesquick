import { KeyboardDoubleArrowUp } from '@mui/icons-material'
import { Button } from '@nextui-org/react'

const ArrowUp = () => {
	return (
		<div className=' flex justify-center items-center'>
			<a href={'#top'}>
				<Button
					variant='bordered'
					className='mb-12 motion-safe:animate-bounce'
					radius='full'
					isIconOnly
					size='lg'
					aria-label='To top'>
					<KeyboardDoubleArrowUp className='text-zinc-100 ' />
				</Button>
			</a>
		</div>
	)
}

export default ArrowUp
