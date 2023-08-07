import { useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { Cast, CreditResult } from '../../types'
import Loader from '../ui/Loader'
import ErrorMessage from '../ui/ErrorMessage'

type IProps = {
	movieId: string
}

const image_base_url = 'https://image.tmdb.org/t/p/w342'

const MovieCast = ({ movieId }: IProps) => {
	const [cast, setCast] = useState<Cast[]>([])

	const movie_cast_api = `${
		import.meta.env.VITE_THE_MOVIEDB_BASE_URL
	}/movie/${movieId}/credits?api_key=${
		import.meta.env.VITE_THE_MOVIEDB_API_KEY
	}`
	const { data, isLoading, error } = useFetch(
		`movie-cast-${movieId}`,
		movie_cast_api
	)

	const result = data as CreditResult | null

	useEffect(() => {
		if (result?.cast) {
			setCast(result.cast.filter((actor) => actor.profile_path != null))
		}
	}, [result])

	return (
		<div className="movie-cast">
			<h1 className="heading-1">Movie Cast</h1>
			<div className="movie-cast__content">
				{isLoading ? (
					<Loader />
				) : error ? (
					<ErrorMessage message={error} />
				) : cast.length > 0 ? (
					cast.map((actor) => (
						<div key={actor.id} className="movie-cast__card">
							<div className="movie-cast__card__content">
								<img
									src={`${image_base_url}${actor.profile_path}`}
									alt={`${actor.name} avatar`}
								/>
								<span>{actor.name}</span>
							</div>
						</div>
					))
				) : (
					<div className="zero-result">No cast found</div>
				)}
			</div>
		</div>
	)
}

export default MovieCast
