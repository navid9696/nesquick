import { Search } from '@mui/icons-material'
import {Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SearchInput = () => {
	const [search, setSearch] = useState<string>('')
	const router = useRouter()

	return (
		<Input
			className='w-full fixed px-8 flex justify-center items-center z-50'
			classNames={{
				label: 'text-white/75',
				input: ['bg-transparent', 'text-white/90 '],
				innerWrapper: 'bg-transparent',
				inputWrapper: [
					'lg:w-1/4',
					'sm:w-1/2',
					'w-3/4',
					'shadow-xl',
					'bg-black/50',
					'backdrop-blur-xl',
					'backdrop-saturate-200',
					'hover:bg-black/25',
					'!cursor-text',
				],
			}}
			type='text'
			label='Search for...'
			variant='bordered'
			value={search}
			onValueChange={value => {
				setSearch(value)
			}}
			onKeyDown={e => {
				e.key === 'Enter' && router.push(`/search/${search}`)
			}}
			endContent={
				<button
					disabled={search === ''}
					onClick={() => {
						router.push(`/search/${search}`)
					}}>
					<Search className=' text-black/50 mb-1 text-3xl text-slate-100 pointer-events-none flex-shrink-0' />
				</button>
			}
		/>
	)
}

export default SearchInput
