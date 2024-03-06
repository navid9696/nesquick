import Hero from '@components/Hero'
import Navbar from '@components/Navbar'
import MovieRow from '@components/MovieRow'
import { IGenres } from '../../../../../lib/types'
import { fetchGenres, fetchTrending } from '../../../../../actions/movieData'
import Footer from '@components/Footer'
import ArrowUp from '@components/ArrowUp'

const Movies = async () => {
	const trendingMovies = await fetchTrending('movie')
	const randomNumber = Math.floor(Math.random() * trendingMovies.length)
	const trendingMovie = trendingMovies[randomNumber]
	const genresMovies = await fetchGenres('movie')

	return (
		<>
			<Navbar />
			<Hero urlCategory={trendingMovie} genres={genresMovies} />
			{genresMovies.map((genre: IGenres) => (
				<MovieRow key={genre?.id} title={genre?.name} movies={genre?.movies} genres={genresMovies}/>
			))}
			<ArrowUp />
			<Footer />
		</>
	)
}

export default Movies
