import { useSearchParams } from 'react-router-dom'
import SearchResult from '../components/search/SearchResult'

const Search = () => {
	const [searchParams] = useSearchParams()
	const query = searchParams.get('q')
	return <SearchResult key={query} query={query!} />
}
export default Search
