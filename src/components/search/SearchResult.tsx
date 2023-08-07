import { RefObject, useEffect, useRef } from 'react'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import useInfiniteFetch from '../../hooks/useInfiniteFetch'
import { MovieListResponse } from '../../types'
import MoviePoster from '../ui/MoviePoster'
import ErrorMessage from '../ui/ErrorMessage'
import Loader from '../ui/Loader'

type IProps = {
	query: string
}

const SearchResult = ({ query }: IProps) => {
	let totalPages = 0
	let pagesFetchedSoFar = 0
	let haveMore = false
	const search_movie_api = `${
		import.meta.env.VITE_THE_MOVIEDB_BASE_URL
	}/search/movie?api_key=${
		import.meta.env.VITE_THE_MOVIEDB_API_KEY
	}&query=${query}`
	const loadMore = useRef<HTMLElement>(null)

	const isIntersecting = useIntersectionObserver(loadMore)

	const { isLoading, isLoadingMore, fetchMore, data, error } = useInfiniteFetch(
		`search-${query}`,
		search_movie_api
	)

	const res = data as MovieListResponse[] | null
	totalPages = res ? res[0].total_pages : 0
	pagesFetchedSoFar = res ? res.length : 0
	haveMore = totalPages !== pagesFetchedSoFar

	useEffect(() => {
		if (haveMore && isIntersecting && !isLoadingMore) {
			console.log('fetchMore Called')
			fetchMore(`${search_movie_api}&page=${pagesFetchedSoFar + 1}`)
		}
	}, [isIntersecting])

	const resultTemplate = () => {
		return (
			<div className="search-results__content">
				{res?.map((result) => {
					return result.results.map((movie) => (
						<MoviePoster
							key={movie.id}
							id={movie.id}
							posterPath={movie.poster_path}
							title={movie.title}
						/>
					))
				})}
			</div>
		)
	}

	const apiRequestTemplate = () => {
		if (error && !res) {
			return <ErrorMessage message={error} />
		} else if (!isLoading && res && res[0].results.length === 0) {
			return <div className="zero-result">No movie found</div>
		} else {
			if (error) {
				return (
					<>
						{resultTemplate()}{' '}
						<ErrorMessage message={'failed to fetch more movies'} />
					</>
				)
			} else {
				return <>{resultTemplate()}</>
			}
		}
	}

	return (
		<div className="container search-results">
			<h1 className="heading-1">Search Results</h1>
			{isLoading ? <Loader /> : apiRequestTemplate()}
			<div ref={loadMore as RefObject<HTMLDivElement>}>
				{isLoadingMore && <Loader />}
			</div>
		</div>
	)
}

export default SearchResult
