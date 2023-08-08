import 'react-multi-carousel/lib/styles.css'
import useFetch from '../../hooks/useFetch'
import Carousel from 'react-multi-carousel'
import MoviePoster from './MoviePoster'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import { MovieListResponse } from '../../types'
import { carouselResponsiveInfo } from '../../utils/helper'

type IProps = {
	title: string
	url: string
	queryKey?: string
}

const MyCarousel = ({ title, url, queryKey }: IProps) => {
	const fetchKey = queryKey || title.toLowerCase().replace(/\s/g, '-')
	const { data, error, isLoading } = useFetch(fetchKey, url)
	const result = (data as MovieListResponse)?.results || []

	const apiRequestTemplate = () => {
		if (error) {
			return <ErrorMessage message={error} />
		} else if (isLoading || data === null) {
			return <Loader />
		} else if (result.length > 0) {
			return (
				// height is required to restore scroll position
				<div style={{ height: '278px' }}>
					<Carousel
						responsive={carouselResponsiveInfo}
						itemClass="carousel-item-center"
					>
						{result.map((movie) => (
							<MoviePoster
								key={movie.id}
								id={movie.id}
								posterPath={movie.poster_path}
								title={movie.title}
							/>
						))}
					</Carousel>
				</div>
			)
		} else {
			return <div className="zero-result">No movie found</div>
		}
	}

	return (
		<div className="my-carousel">
			<h1 className="heading-1">{title}</h1>
			{apiRequestTemplate()}
		</div>
	)
}

export default MyCarousel
