import { YouTubeEmbed } from '@next/third-parties/google'

const YTEmbed = () => {
	return (
		<YouTubeEmbed
			videoid='e1k1PC0TtmE'
			params='autoplay=1&disablekb=1&controls=0&iv_load_policy=0&loop=1&rel=0&cc_load_policy=0'
		/>
	)
}

export default YTEmbed
