import Navbar from '@components/Navbar'
import { fetchFavorites } from '../../../../actions/user'
import MovieCard, { Props } from '@components/MovieCard'
import { IGenres, IMovie } from '../../../../lib/types'
import { fetchGenres, fetchMovieDetails, fetchTvDetails } from '../../../../actions/movieData'
import { useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { KeyboardDoubleArrowDown } from '@mui/icons-material'

const Favorites = async () => {
	const favorites = await fetchFavorites()

	const joined = favorites.join(',')

	let favMovies: IMovie[] = []
	let favTv: IMovie[] = []

	favMovies = await Promise.all(
		favorites.map(async (movieId: number) => {
			const movieDetails = await fetchMovieDetails(movieId)
			if (movieDetails.title) {
				return movieDetails // To jest film
			} else {
				return null // To nie jest film, możesz obsłużyć ten przypadek w inny sposób
			}
		})
	)

	favTv = await Promise.all(
		favorites.map(async (tvId: number) => {
			const tvDetails = await fetchTvDetails(tvId)
			if (tvDetails.name) {
				return tvDetails // To jest serial
			} else {
				return null // To nie jest serial, możesz obsłużyć ten przypadek w inny sposób
			}
		})
	)

	const genresMovies = await fetchGenres('movie')
	const genresTv = await fetchGenres('tv')

	return (
		<>
			<Navbar />
			{favorites.length === 0 ? (
				<div className='p-5'>
					<h1 className='text-white text-2xl text-center'>Try to like something</h1>
				</div>
			) : (
				<div>
					<h1 className='p-5 text-white text-2xl text-center'>{joined}</h1>

					<div className='p-5'>
						<div className='text-slate-50 mt-10'>
							<div className='relative'>
								<a href={'#series'} className='absolute bottom-1 right-0'>
									<Button variant='bordered' radius='full' isIconOnly aria-label='To series'>
										<KeyboardDoubleArrowDown className='text-zinc-100 ' />
									</Button>
								</a>
								<h2 className='tracking-widest text-3xl sm:text-4xl font-bold text-center'>Movies</h2>
							</div>

							<hr></hr>
							{favMovies.length === 0 ? (
								<h3 className='mt-5 text-white/75 text-center'>No movies liked</h3>
							) : (
								<div className='mt-2 flex justify-center flex-wrap gap-x-5'>
									{favMovies.map(movie => (
										<MovieCard key={movie.id} movie={movie} genres={genresMovies} type='movie' />
									))}
								</div>
							)}
						</div>
						<div id='series' className='pt-32 mb-10 text-slate-50 mt-10'>
							<h2 className='tracking-widest text-3xl sm:text-4xl font-bold text-center'>Series</h2>
							<hr></hr>
							{favTv.length === 0 ? (
								<h3 className='mt-5 text-white/75 text-center'>No series liked</h3>
							) : (
								<div className='mt-2 flex justify-center flex-wrap gap-x-5'>
									{favTv.map(movie => (
										<MovieCard key={movie.id} movie={movie} genres={genresTv} type='tv' />
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Favorites
