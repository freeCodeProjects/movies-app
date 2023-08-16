import { useContext, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { MovieResult } from '../../types'
import ErrorMessage from '../ui/ErrorMessage'
import Loader from '../ui/Loader'
import { getFormattedRuntime, getFormattedDate } from '../../utils/helper'
import playIcon from '../../assets/play.svg'
import Trailer from './Trailer'
import favouriteIcon from '../../assets/addToFavourite.svg'
import deleteIcon from '../../assets/delete.svg'
import { FavouriteMovieContext } from '../../contexts/FavouriteMovieContext'

const image_base_url = 'https://image.tmdb.org/t/p/w342'

type IProps = {
	movieId: string
}

const MovieDetailCard = ({ movieId }: IProps) => {
	const movie_detail_api = `${
		import.meta.env.VITE_THE_MOVIEDB_BASE_URL
	}/movie/${movieId}?api_key=${import.meta.env.VITE_THE_MOVIEDB_API_KEY}`
	const { data, isLoading, error } = useFetch(
		`movie-${movieId}`,
		movie_detail_api
	)

	const [genres, setGenres] = useState<string[]>([])
	const [showTrailer, setShowTrailer] = useState(false)
	const { isFavorite, addFavorite, deleteFavorite } = useContext(
		FavouriteMovieContext
	)

	const result = data as MovieResult | null

	useEffect(() => {
		if (!result) return
		if (result.genres) {
			setGenres(result.genres.map((genere) => genere.name))
		}
	}, [result])

	return (
		<div>
			<h1 className="heading-1">Movie Details</h1>
			{error ? (
				<ErrorMessage message={error} />
			) : isLoading || !result ? (
				<Loader />
			) : (
				<div className="movie-details__content">
					<div className="movie-details-card">
						{result?.poster_path && (
							<img
								className="poster"
								src={`${image_base_url}${result.poster_path}`}
								alt={`${result.title} movie poster`}
							/>
						)}
						<div className="info">
							<div className="info__header">
								<h1 className="heading-2">{result.title}</h1>
								{isFavorite(result.id) ? (
									<img
										src={deleteIcon}
										onClick={() => deleteFavorite(result.id)}
										alt="delete icon"
									/>
								) : (
									<img
										src={favouriteIcon}
										onClick={() =>
											addFavorite(result.id, result.title, result.poster_path)
										}
										alt="favourite icon"
									/>
								)}
							</div>
							<div className="details">
								<div className="detail">
									<h3 className="heading-3">Release Date</h3>
									<p className="detail__info">
										{getFormattedDate(result.release_date)}
									</p>
								</div>
								<div className="detail">
									<h3 className="heading-3">Duration</h3>
									<p className="detail__info">
										{getFormattedRuntime(result.runtime)}
									</p>
								</div>
								<div className="detail">
									<h3 className="heading-3">Genre</h3>
									<p className="detail__info">{genres.join(', ')}</p>
								</div>
								<div
									className="play-trailer"
									onClick={() => setShowTrailer(true)}
								>
									<img src={playIcon} alt="play icon" />
									<h3 className="heading-3">Play Trailer</h3>
								</div>
							</div>
							<div className="overview">
								<h2 className="heading-3">Overview</h2>
								<p>{result?.overview}</p>
							</div>
						</div>
					</div>
				</div>
			)}
			{showTrailer && (
				<Trailer movieId={movieId} closeTrailer={() => setShowTrailer(false)} />
			)}
		</div>
	)
}
export default MovieDetailCard
