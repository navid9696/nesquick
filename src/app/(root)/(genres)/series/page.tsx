import Hero from '@components/Hero'
import Navbar from '@components/Navbar'
import MovieRow from '@components/MovieRow'
import { fetchGenres, fetchTrending } from '../../../../../actions/movieData'
import { IGenres } from '../../../../../lib/types'
import Footer from '@components/Footer'
import ArrowUp from '@components/ArrowUp'

const Series = async () => {
	const trendingTv = await fetchTrending('tv')
	const randomNumber = Math.floor(Math.random() * trendingTv.length)
	const trendingShow = trendingTv[randomNumber]
	const genresTv = await fetchGenres('tv')

	return (
		<>
			<Navbar />
			<Hero urlCategory={trendingShow} genres={genresTv} />
			<main>
				{genresTv.map((genre: IGenres) => (
					<MovieRow type='tv' key={genre?.id} title={genre?.name} movies={genre?.movies} genres={genresTv} />
				))}
				<ArrowUp />
				<Footer />
			</main>
		</>
	)
}

export default Series
