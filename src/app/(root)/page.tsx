import Hero from '@components/Hero'
import Navbar from '@components/Navbar'
import { fetchTrending } from '../../../actions/movieData'

const Home = async () => {
	const trendingMovies = await fetchTrending('movie')
	const randomNumber = Math.floor(Math.random() * trendingMovies.length)
	const trendingMovie = trendingMovies[randomNumber]

	return (
		<>
			<Navbar />
			<Hero urlCategory={trendingMovie} />
		</>
	)
}

export default Home
