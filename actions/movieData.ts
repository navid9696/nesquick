import { getApiResponse } from '../lib/requests'

export const fetchTrending = async (category:string) => {
	const data = await getApiResponse(`/trending/${category}/week`)
	const trending = data.results

	return trending
}
