import useFetch from '../../hooks/useFetch'
import { Cast, CreditResult } from '../../types'
import Loader from '../ui/Loader'
import ErrorMessage from '../ui/ErrorMessage'
import Carousel from 'react-multi-carousel'
import { carouselResponsiveInfo } from '../../utils/helper'
import emptyUser from '../../assets/empty-user.svg'

type IProps = {
	movieId: string
}

const image_base_url = 'https://image.tmdb.org/t/p/w342'

const MovieCast = ({ movieId }: IProps) => {
	const movie_cast_api = `${
		import.meta.env.VITE_THE_MOVIEDB_BASE_URL
	}/movie/${movieId}/credits?api_key=${
		import.meta.env.VITE_THE_MOVIEDB_API_KEY
	}`
	const { data, isLoading, error } = useFetch(
		`movie-cast-${movieId}`,
		movie_cast_api
	)
	let casts: Cast[] | null = null

	const result = data as CreditResult | null
	if (result?.cast) {
		const castWithPhoto = result.cast.filter(
			(actor) => actor.profile_path !== null
		)
		const castWithoutPhoto = result.cast.filter(
			(actor) => actor.profile_path === null
		)
		casts = [...castWithPhoto, ...castWithoutPhoto]
	}

	return (
		<div className="movie-cast">
			<h1 className="heading-1">Movie Cast</h1>
			{error ? (
				<ErrorMessage message={error} />
			) : isLoading || !result ? (
				<Loader />
			) : !casts || casts.length === 0 ? (
				<div className="zero-result">No cast found</div>
			) : (
				<div style={{ height: '360px' }}>
					<Carousel responsive={carouselResponsiveInfo}>
						{casts.map((actor) => (
							<div key={actor.id} className="movie-cast__card">
								<div className="movie-cast__card__content">
									{actor.profile_path ? (
										<img
											src={`${image_base_url}${actor.profile_path}`}
											alt={`${actor.name} avatar`}
										/>
									) : (
										<img
											style={{ backgroundColor: 'var(--primary-color)' }}
											src={emptyUser}
											alt={`avatar not found`}
										/>
									)}
									<span className="truncate">{actor.name}</span>
								</div>
							</div>
						))}
					</Carousel>
				</div>
			)}
		</div>
	)
}

export default MovieCast
