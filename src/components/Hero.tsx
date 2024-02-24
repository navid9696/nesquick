import Image from 'next/image'
import { fetchTrending } from '../../actions/movieData'
import { IMovie } from '../../lib/types'
import { baseImgUrl } from '../../lib/constants'

const getRandomItem = (array: []) => {
	const randomNumber = Math.floor(Math.random() * array.length)
	return array[randomNumber]
}

const Hero = async () => {
	const [trendingMovies, trendingSeries] = await Promise.all([fetchTrending('movie'), fetchTrending('tv')])

	const trendingMovie: IMovie = getRandomItem(trendingMovies)
	const trendingShow: IMovie = getRandomItem(trendingSeries)

	const trendingData = {
		trendingMovie: trendingMovie,
		trendingShow: trendingShow,
		trendingMovies: trendingMovies,
		trendingSeries: trendingSeries,
	}
	return (
		<div>
			<div>
				<Image alt='poster' width={100} height={100} src={`${baseImgUrl}`} />
			</div>
		</div>
	)
}

export default Hero
