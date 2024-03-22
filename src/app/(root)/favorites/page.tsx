import Navbar from '@components/Navbar'
import { fetchFavorites } from '../../../../actions/user'
import MovieCard, { Props } from '@components/MovieCard'
import { IGenres, IMovie } from '../../../../lib/types'
import { fetchGenres, fetchMovieDetails, fetchTvDetails } from '../../../../actions/movieData'
import { useEffect } from 'react'

const Favorites = async () => {
	const favorites = await fetchFavorites()

	const joined = favorites.join(',')

	const myListDetails = await Promise.all(
		favorites.map(async (movieId: number) => {
			const movieDetails = await fetchMovieDetails(movieId)

			return movieDetails
		})
	)
	const {movieGenres} = await fetchGenres('movie')
	return (
		<>
			<Navbar />
			<div className='mt-2 flex justify-center flex-wrap gap-x-5'>{joined}</div>
			<div className='mt-2 flex justify-center flex-wrap gap-x-5'>
				{' '}
				{myListDetails.map((movie: IMovie) => (
					<MovieCard key={movie?.id} movie={movie} genres={movie.genres} type='movie' />
				))}
			</div>
		</>
	)
}

export default Favorites
