import Hero from '@components/Hero'
import Navbar from '@components/Navbar'
import { fetchTrending } from '../../../actions/movieData'

const Home = async () => {
	const trendingMovies = await fetchTrending('movie')
	const trendingTv = await fetchTrending('tv')
	const trendingShows = [...trendingMovies, ...trendingTv]
	const randomNumber = Math.floor(Math.random() * trendingShows.length)
	const trendingShow = trendingShows[randomNumber]

	return (
		<>
			<Navbar />
			<Hero urlCategory={trendingShow} />
		</>
	)
}

export default Home
