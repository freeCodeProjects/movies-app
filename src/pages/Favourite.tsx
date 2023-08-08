import { useContext } from 'react'
import MoviePoster from '../components/ui/MoviePoster'
import { FavouriteMovieContext } from '../contexts/FavouriteMovieContext'

const Favourite = () => {
	const { favouriteMovieStore } = useContext(FavouriteMovieContext)

	return (
		<div className="container favourite-movies">
			<h1 className="heading-1">Favourite Movies</h1>
			{favouriteMovieStore.movies.length === 0 ? (
				<div className="zero-result">No movie found</div>
			) : (
				<div className="favourite-movies__content">
					{favouriteMovieStore.movies.map((movie) => (
						<MoviePoster
							key={movie.id}
							id={movie.id}
							posterPath={movie.poster_path}
							title={movie.title}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Favourite
