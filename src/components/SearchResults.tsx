import { KeyboardDoubleArrowDown } from '@mui/icons-material'
import { fetchGenres, fetchSearch } from '../../actions/movieData'
import { IMovie } from '../../lib/types'
import MovieCard from './MovieCard'
import { Button } from '@nextui-org/react'

interface SearchResultsProps {
	query: string
}

const SearchResults = async ({ query }: SearchResultsProps) => {
	let searchedMovies: IMovie[] = []
	let searchedTv: IMovie[] = []
	let searchedShows: IMovie[] = []

	searchedMovies = await fetchSearch('movie', query)
	searchedTv = await fetchSearch('tv', query)
	searchedShows = [...searchedMovies, ...searchedTv]

	const genresMovies = await fetchGenres('movie')
	const genresTv = await fetchGenres('tv')

	return searchedShows.length === 0 ? (
		<div className='p-5'>
			<h1 className='text-white text-2xl text-center'>No results found</h1>
		</div>
	) : (
		<div>
			<h1 className='p-5 text-white text-2xl text-center'>
				Results for &quot;<span className='font-semibold'>{decodeURIComponent(query)}</span>&quot;
			</h1>

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
					{searchedMovies.length === 0 ? (
						<h3 className='mt-5 text-white/75 text-center'>No movies found</h3>
					) : (
						<div className='mt-2 flex justify-center flex-wrap gap-x-5'>
							{searchedMovies.map(movie => (
								<MovieCard key={movie.id} movie={movie} genres={genresMovies} type={'movie'} />
							))}
						</div>
					)}
				</div>
				<div id='series' className='pt-32 mb-10 text-slate-50 mt-10'>
					<h2 className='tracking-widest text-3xl sm:text-4xl font-bold text-center'>Series</h2>
					<hr></hr>
					{searchedTv.length === 0 ? (
						<h3 className='mt-5 text-white/75 text-center'>No series found</h3>
					) : (
						<div className='mt-2 flex justify-center flex-wrap gap-x-5'>
							{searchedTv.map(movie => (
								<MovieCard key={movie.id} movie={movie} genres={genresTv} type={'tv'} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default SearchResults
