import Navbar from '@components/Navbar'
import { fetchFavorites } from '../../../../actions/user'
import MovieCard, { Props } from '@components/MovieCard'
import { IGenres, IMovie } from '../../../../lib/types'
import { fetchGenres, fetchMovieDetails, fetchTvDetails } from '../../../../actions/movieData'
import { useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { KeyboardDoubleArrowDown } from '@mui/icons-material'
import { Favorite } from '@components/BodyModal'
import Footer from '@components/Footer'
import ArrowUp from '@components/ArrowUp'


const Favorites = async () => {

	const favorites = await fetchFavorites()

	let favMovies: IMovie[] = []

	favMovies = await Promise.all(
		favorites.map(async (movie: Favorite) => {
			const movieDetails = await fetchMovieDetails(movie?.movieId, movie?.movieType)
			return movieDetails
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
					<h1 className='p-5 text-white text-2xl text-center'>Shows you liked</h1>

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
									{favMovies.map(
										movie =>
											movie?.title && <MovieCard key={movie.id} movie={movie} genres={genresMovies} type='movie' />
									)}
								</div>
							)}
						</div>
						<div id='series' className='pt-32 mb-10 text-slate-50 mt-10'>
							<h2 className='tracking-widest text-3xl sm:text-4xl font-bold text-center'>Series</h2>
							<hr></hr>
							{favMovies.length === 0 ? (
								<h3 className='mt-5 text-white/75 text-center'>No series liked</h3>
							) : (
								<div className='mt-2 flex justify-center flex-wrap gap-x-5'>
									{favMovies.map(
										movie => movie?.name && <MovieCard key={movie.id} movie={movie} genres={genresTv} type='tv' />
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
			<ArrowUp />
			<Footer />
		</>
	)
}

export default Favorites
