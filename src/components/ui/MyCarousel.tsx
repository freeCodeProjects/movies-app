import 'react-multi-carousel/lib/styles.css'
import useFetch from '../../hooks/useFetch'
import Carousel from 'react-multi-carousel'
import MoviePoster from './MoviePoster'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import { MovieListResponse } from '../../types'

type IProps = {
	title: string
	url: string
}

const responsive = {
	xxl: {
		breakpoint: { max: 3000, min: 1440 },
		items: 5,
		slidesToSlide: 5
	},
	xl: {
		breakpoint: { max: 1440, min: 1024 },
		items: 5,
		slidesToSlide: 5
	},
	l: {
		breakpoint: { max: 1024, min: 830 },
		items: 4,
		slidesToSlide: 4
	},
	m: {
		breakpoint: { max: 830, min: 630 },
		items: 3,
		slidesToSlide: 3
	},
	s: {
		breakpoint: { max: 630, min: 420 },
		items: 2,
		slidesToSlide: 2
	},
	xs: {
		breakpoint: { max: 420, min: 0 },
		items: 1,
		slidesToSlide: 1
	}
}

const MyCarousel = ({ title, url }: IProps) => {
	const { data, error, isPending } = useFetch(url)
	const result = (data as MovieListResponse | null)?.results || []

	const apiRequestTemplate = () => {
		if (isPending || data === null) {
			return <Loader />
		} else if (error) {
			return <ErrorMessage message={error} />
		} else if (result.length > 0) {
			return (
				// height is required to restore scroll position
				<div style={{ height: '278px' }}>
					<Carousel responsive={responsive} itemClass="carousel-item-center">
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
