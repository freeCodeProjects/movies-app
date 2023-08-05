import { useParams } from 'react-router-dom'

const Movie = () => {
	const { id } = useParams()
	return <h1>Movie with id: {id}</h1>
}
export default Movie
