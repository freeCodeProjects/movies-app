import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './Header'
import QueryCacheContextProvider from '../../contexts/QueryCacheContext'
import PageLoader from '../ui/PageLoader'

const Root = () => {
	return (
		<QueryCacheContextProvider>
			<>
				<ScrollRestoration />
				<Header />
				<Suspense fallback={<PageLoader />}>
					<div className="app__content">
						<Outlet />
					</div>
				</Suspense>
			</>
		</QueryCacheContextProvider>
	)
}
export default Root
