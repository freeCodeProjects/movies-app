import { ReactElement, createContext, useState, useEffect } from 'react'
import { FavouriteMovieStore } from '../types'

const useValue = () => {
	const [favouriteMovieStore, setFavouriteMovieStore] =
		useState<FavouriteMovieStore>(
			JSON.parse(localStorage.getItem('favouriteMovies')!) || {
				movieIds: {},
				movies: []
			}
		)

	const isFavorite = (id: number): boolean => {
		if (id in favouriteMovieStore.movieIds) return true
		return false
	}

	const addFavorite = (id: number, title: string, poster_path: string) => {
		const newMovie = { id, title, poster_path }
		setFavouriteMovieStore((prevData) => ({
			movieIds: { ...prevData.movieIds, [id]: true },
			movies: [newMovie, ...prevData.movies]
		}))
	}

	const deleteFavorite = (id: number) => {
		setFavouriteMovieStore((prevData) => {
			delete prevData.movieIds[id]
			return {
				movieIds: prevData.movieIds,
				movies: prevData.movies.filter((movie) => movie.id !== id)
			}
		})
	}

	useEffect(() => {
		localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovieStore))
	}, [favouriteMovieStore])

	return {
		favouriteMovieStore,
		isFavorite,
		addFavorite,
		deleteFavorite
	}
}

export const FavouriteMovieContext = createContext(
	{} as ReturnType<typeof useValue>
)

const FavouriteMovieContextProvider = ({
	children
}: {
	children: ReactElement
}) => {
	return (
		<FavouriteMovieContext.Provider value={useValue()}>
			{children}
		</FavouriteMovieContext.Provider>
	)
}
export default FavouriteMovieContextProvider
