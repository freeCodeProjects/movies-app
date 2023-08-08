import { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import useFetch from '../../hooks/useFetch'
import { VideoResult } from '../../types'
import Loader from '../ui/Loader'
import ErrorMessage from '../ui/ErrorMessage'

type IProps = {
	movieId: string
	closeTrailer: () => void
}

const Trailer = ({ movieId, closeTrailer }: IProps) => {
	const movie_video_api = `${
		import.meta.env.VITE_THE_MOVIEDB_BASE_URL
	}/movie/${movieId}/videos?api_key=${import.meta.env.VITE_THE_MOVIEDB_API_KEY}`
	const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null)
	const [videoIdFound, setVideoIdFound] = useState<boolean | null>(null)
	const opts = {
		playerVars: {
			autoplay: 1
		}
	}

	const { data, isLoading, error } = useFetch(
		`trailer-${movieId}`,
		movie_video_api
	)

	const result = data as VideoResult | null

	useEffect(() => {
		if (result) {
			let videoIdFound = false
			for (const videoData of result.results) {
				if (videoData.type === 'Trailer' && videoData.site === 'YouTube') {
					videoIdFound = true
					setYoutubeVideoId(videoData.key)
					break
				}
			}
			setVideoIdFound(videoIdFound)
		}
	}, [result])

	const closeOnBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!e.currentTarget.closest('.trailer-container')) {
			closeTrailer()
		}
	}

	return (
		<div onClick={closeOnBackgroundClick} className="trailer">
			<div className="trailer-container">
				{isLoading || !result ? (
					<Loader />
				) : error ? (
					<div className="trailer-error-container">
						<ErrorMessage message={error} />
					</div>
				) : videoIdFound === false ? (
					<div className="trailer-error-container">
						<ErrorMessage message="No Trailer Found" />
					</div>
				) : (
					<YouTube
						style={{ width: '100%', maxWidth: '1080px', aspectRatio: '16/9' }}
						videoId={youtubeVideoId!}
						opts={opts}
						iframeClassName={'react-youtube-iframe'}
					/>
				)}
			</div>
		</div>
	)
}

export default Trailer
