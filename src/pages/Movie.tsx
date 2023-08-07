import { useParams } from 'react-router-dom'
import MovieDetailCard from '../components/movie/MovieDetailCard'

const Movie = () => {
	const { id } = useParams()
	return (
		<div className="container">
			<MovieDetailCard key={id} id={id!} />
		</div>
	)
}
export default Movie
