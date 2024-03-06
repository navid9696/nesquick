import { KeyboardDoubleArrowUp } from '@mui/icons-material'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

const ArrowUp = () => {
	return (
		<div className=' flex justify-center items-center'>
			<Link href={'#top'}>
				<Button variant='bordered' className='mb-12 motion-safe:animate-bounce' radius='full' isIconOnly aria-label='To top'>
					<KeyboardDoubleArrowUp className='text-zinc-100 ' />
				</Button>
			</Link>
		</div>
	)
}

export default ArrowUp
