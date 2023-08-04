import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './Header'

const Root = () => {
	return (
		<>
			<ScrollRestoration />
			<Header />
			<Suspense fallback={<h1>Page Loader</h1>}>
				<div className="app__content">
					<Outlet />
				</div>
			</Suspense>
		</>
	)
}
export default Root
