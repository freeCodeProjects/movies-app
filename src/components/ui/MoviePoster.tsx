import { useContext } from 'react'
import { Link } from 'react-router-dom'
import favouriteIcon from '../../assets/addToFavourite.svg'
import deleteIcon from '../../assets/delete.svg'
import { FavouriteMovieContext } from '../../contexts/FavouriteMovieContext'

const image_base_url = 'https://image.tmdb.org/t/p/w185'

type IProps = {
	id: number
	posterPath: string
	title: string
}

const MoviePoster = ({ id, posterPath, title }: IProps) => {
	const { isFavorite, addFavorite, deleteFavorite } = useContext(
		FavouriteMovieContext
	)
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
				<div className="movie-poster-overlay__icon">
					{isFavorite(id) ? (
						<img
							src={deleteIcon}
							onClick={(e) => {
								e.preventDefault()
								deleteFavorite(id)
							}}
							alt="delete icon"
						/>
					) : (
						<img
							src={favouriteIcon}
							onClick={(e) => {
								e.preventDefault()
								addFavorite(id, title, posterPath)
							}}
							alt="favourite icon"
						/>
					)}
				</div>
				<span className="movie-poster-overlay__title">{title}</span>
			</div>
		</Link>
	)
}

export default MoviePoster
