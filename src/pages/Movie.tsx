import { useParams } from 'react-router-dom'
import MovieDetailCard from '../components/movie/MovieDetailCard'
import MovieCast from '../components/movie/MovieCast'
import MyCarousel from '../components/ui/MyCarousel'

const Movie = () => {
	const { id } = useParams()
	const similar_movie_api = `${
		import.meta.env.VITE_THE_MOVIEDB_BASE_URL
	}/movie/${id}/similar?api_key=${import.meta.env.VITE_THE_MOVIEDB_API_KEY}`

	return (
		<div className="container movie">
			<MovieDetailCard key={`detail-${id}`} movieId={id!} />
			<MovieCast key={`cast-${id}`} movieId={id!} />
			<MyCarousel
				key={`similar-${id}`}
				queryKey={`similar-${id}`}
				title="Similar Movies"
				url={similar_movie_api}
			/>
		</div>
	)
}
export default Movie
