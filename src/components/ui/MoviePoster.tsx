import { useContext } from 'react'
import { Link } from 'react-router-dom'
import favouriteIcon from '../../assets/addToFavourite.svg'
import deleteIcon from '../../assets/delete.svg'
import { FavouriteMovieContext } from '../../contexts/FavouriteMovieContext'
import { getFormattedDate, getGenreById } from '../../utils/helper'
import CircleRating from './CircularRating'
import GenreList from './GenreList'
import NoPosterImg from '../../assets/no-poster.svg'

const image_base_url = 'https://image.tmdb.org/t/p/w342'

type IProps = {
	id: number
	posterPath: string
	title: string
	rating?: number
	release_date?: string
	genre_ids?: number[]
}

const MoviePoster = ({
	id,
	posterPath,
	title,
	rating,
	release_date,
	genre_ids
}: IProps) => {
	const { isFavorite, addFavorite, deleteFavorite } = useContext(
		FavouriteMovieContext
	)

	const genreList = genre_ids?.slice(0, 2).map((id) => getGenreById(id)) || []

	const template =
		posterPath !== null ? (
			<img src={`${image_base_url}${posterPath}`} alt={`${title} poster`} />
		) : (
			<img src={NoPosterImg} alt={`no poster available`} />
		)

	return (
		<div className="movie-poster-container">
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
					<div className="movie-poster-genres">
						<GenreList genres={genreList} />
					</div>
				</div>
				{Boolean(rating) && (
					<div className="movie-poster-circular-progress">
						<CircleRating rating={rating!} />
					</div>
				)}
			</Link>
			<div style={{ marginTop: '2rem' }}>
				<h4 className="truncate heading-4">{title}</h4>
				{release_date && (
					<div className="text-sm" style={{ marginTop: '0.5rem' }}>
						{getFormattedDate(release_date)}
					</div>
				)}
			</div>
		</div>
	)
}

export default MoviePoster
