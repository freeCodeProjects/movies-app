import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './Header'
import QueryCacheContextProvider from '../../contexts/QueryCacheContext'
import PageLoader from '../ui/PageLoader'
import InfiniteQueryCacheContextProvider from '../../contexts/InfiniteQueryCacheContext'
import FavouriteMovieContextProvider from '../../contexts/FavouriteMovieContext'

const Root = () => {
	return (
		<FavouriteMovieContextProvider>
			<QueryCacheContextProvider>
				<InfiniteQueryCacheContextProvider>
					<>
						<ScrollRestoration />
						<Header />
						<Suspense fallback={<PageLoader />}>
							<div className="app__content">
								<Outlet />
							</div>
						</Suspense>
					</>
				</InfiniteQueryCacheContextProvider>
			</QueryCacheContextProvider>
		</FavouriteMovieContextProvider>
	)
}
export default Root
