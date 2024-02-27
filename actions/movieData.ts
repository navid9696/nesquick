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
		const data = await getApiResponse(`/discover/movie?with_genres=${genre.id}`)
		// Add movies array to genre object --> For examples: genre = { id: 28, name: 'Action', movies: [ ... ]},
		genre.movies = data.results
	}

	return genres
}
