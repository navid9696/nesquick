import { ScrollShadow } from '@nextui-org/react'
import { IMovie } from '../../lib/types'
import MovieCard from './MovieCard'

interface Props {
	title: string
	movies: IMovie[]
}

const MovieRow = ({ title, movies }: Props) => {
	return (
		<div className='ml-20 mr-20 mb-20 text-slate-50 bg-gradient-to-r bg-gradient from-black via-transparent to-black'>
			<h2 className='mb-5 text-2xl'>{title}</h2>
			<ScrollShadow hideScrollBar orientation='horizontal'>
				<div className='flex gap-5'>
					{movies.map(movie => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			</ScrollShadow>
		</div>
	)
}

export default MovieRow
