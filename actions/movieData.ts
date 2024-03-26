import { getApiResponse } from '../lib/requests'

export const fetchTrending = async (category: string) => {
	const data = await getApiResponse(`/trending/${category}/week`)
	const trending = data.results

	return trending
}

export const fetchGenres = async (category: string) => {
	const data = await getApiResponse(`/genre/${category}/list`)
	const genres = data.genres

	for (const genre of genres) {
		const data = await getApiResponse(`/discover/${category}?with_genres=${genre.id}&sort_by=popularity.desc`)

		genre.movies = data.results
	}

	return genres
}

export const fetchMovieDetails = async (id: number, category: string) => {
	const movieDetails = await getApiResponse(`/${category}/${id}?append_to_response=videos`)

	return movieDetails
}
export const fetchTvDetails = async (id: number, category: string) => {
	const tvDetails = await getApiResponse(`/${category}/${id}?append_to_response=videos`)

	return tvDetails
}

export const fetchSearch = async (category: string, query: string) => {
	const data = await getApiResponse(`/search/${category}?query=${query}`)
	const searched = data.results

	return searched
}
