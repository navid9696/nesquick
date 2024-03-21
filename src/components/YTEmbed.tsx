
import { YouTubeEmbed } from '@next/third-parties/google'
import { useEffect, useState } from 'react'

interface YTEmbedProps {
	movieId?: number
	category?: string
}

const YTEmbed = ({ movieId, category }: YTEmbedProps) => {
	const [trailerKey, setTrailerKey] = useState<string>('')

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
		},
	}

	const fetchTrailers = async () => {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${category}/${movieId}/videos`, options)
			const data = await res.json()
			const trailers = data.results

			for (const trailer of trailers) {
				if (trailer?.type === 'Trailer') {
					setTrailerKey(trailer.key)
					return
				}
			}

			for (const trailer of trailers) {
				if (
					trailer?.type === 'Teaser' ||
					trailer?.type === 'Opening Credits' ||
					trailer?.type === 'Featurette' ||
					trailer?.type === 'Clip'
				) {
					setTrailerKey(trailer.key)
					return
				}
			}
		} catch (err) {
			console.log('Error - ', err)
		}
	}
	useEffect(() => {
		fetchTrailers()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movieId, category])

	return (
		<YouTubeEmbed
			videoid={trailerKey}
			params='?autoplay=1&iv_load_policy=0&loop=1&rel=0&cc_load_policy=0'
		/>
	)
}
export default YTEmbed
