import Navbar from '@components/Navbar'
import { fetchFavorites } from '../../../../actions/user'
import MovieCard from '@components/MovieCard'
import { IMovie } from '../../../../lib/types'

const Favorites = async () => {
	const favorites = await fetchFavorites()

	return (
		<>
			<Navbar />
			<div className='mt-2 flex justify-center flex-wrap gap-x-5'>
				<h1 className='text-white'>{favorites}</h1>
				{favorites.map((movie: number) => (
					<MovieCard key={movie} />
				))}
			</div>
		</>
	)
}

export default Favorites
