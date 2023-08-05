import MyCarousel from '../components/ui/MyCarousel'

const MOVIEDB_BASE_URL = import.meta.env.VITE_THE_MOVIEDB_BASE_URL
const MOVIEDB_API_KEY = import.meta.env.VITE_THE_MOVIEDB_API_KEY

const trending_movie_api = `${MOVIEDB_BASE_URL}/trending/movie/day?api_key=${MOVIEDB_API_KEY}`
const top_rated_movie_api = `${MOVIEDB_BASE_URL}/movie/top_rated?api_key=${MOVIEDB_API_KEY}`
const now_playing_movie_api = `${MOVIEDB_BASE_URL}/movie/now_playing?api_key=${MOVIEDB_API_KEY}`
const upcoming_movie_api = `${MOVIEDB_BASE_URL}/movie/upcoming?api_key=${MOVIEDB_API_KEY}`

const Home = () => {
	return (
		<div className="container home">
			<MyCarousel title="Now playing Movies" url={now_playing_movie_api} />
			<MyCarousel title="Trending Movies" url={trending_movie_api} />
			<MyCarousel title="Top Rated Movies" url={top_rated_movie_api} />
			<MyCarousel title="Upcoming Movies" url={upcoming_movie_api} />
		</div>
	)
}

export default Home
