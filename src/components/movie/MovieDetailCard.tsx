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
import NoPosterImg from '../../assets/no-poster.svg'
import CircleRating from '../ui/CircularRating'

const image_base_url = 'https://image.tmdb.org/t/p/w500'

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

	const rating = parseFloat(result?.vote_average.toFixed(1) || '0')

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
						{result?.poster_path ? (
							<img
								className="poster"
								src={`${image_base_url}${result.poster_path}`}
								alt={`${result.title} movie poster`}
							/>
						) : (
							<img
								className="poster"
								src={NoPosterImg}
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
							<div style={{ display: 'flex', gap: '2rem' }}>
								{Boolean(rating) && (
									<div style={{ width: '4rem' }}>
										<CircleRating rating={rating} />
									</div>
								)}
								<div
									className="play-trailer"
									onClick={() => setShowTrailer(true)}
								>
									<img src={playIcon} alt="play icon" />
									<h3 className="heading-2">Play Trailer</h3>
								</div>
							</div>
							<div className="details">
								<div className="detail">
									<h3 className="heading-3">Status</h3>
									<p className="detail__info">{result.status || 'Unknown'}</p>
								</div>
								<div className="detail">
									<h3 className="heading-3">Release Date</h3>
									<p className="detail__info">
										{getFormattedDate(result.release_date)}
									</p>
								</div>
								<div className="detail">
									<h3 className="heading-3">Duration</h3>
									<p className="detail__info">
										{getFormattedRuntime(result.runtime) || 'Unknown'}
									</p>
								</div>
								<div className="detail">
									<h3 className="heading-3">Genre</h3>
									<p className="detail__info">{genres.join(', ')}</p>
								</div>
							</div>
							<div className="overview">
								<h2 className="heading-3">Overview</h2>
								<p>{result?.overview || 'Not provided'}</p>
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
