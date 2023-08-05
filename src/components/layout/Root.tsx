import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './Header'
import PageLoader from '../ui/PageLoader'

const Root = () => {
	return (
		<>
			<ScrollRestoration />
			<Header />
			<Suspense fallback={<PageLoader />}>
				<div className="app__content">
					<Outlet />
				</div>
			</Suspense>
		</>
	)
}
export default Root
