import { Link } from 'react-router-dom'

const image_base_url = 'https://image.tmdb.org/t/p/w185'

type IProps = {
	id: number
	posterPath: string
	title: string
}

const MoviePoster = ({ id, posterPath, title }: IProps) => {
	const template =
		posterPath !== null ? (
			<img src={`${image_base_url}${posterPath}`} alt={`${title} poster`} />
		) : (
			<span>{title}</span>
		)
	return (
		<Link to={`/movie/${id}`} className="movie-poster">
			{template}
			<div className="movie-poster-overlay">
				<span className="movie-poster-overlay__title">{title}</span>
			</div>
		</Link>
	)
}

export default MoviePoster
