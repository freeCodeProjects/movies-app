import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Root from '../components/layout/Root'
import ErrorPage from '../pages/ErrorPage'
const Home = lazy(() => import('../pages/Home'))
const Movie = lazy(() => import('../pages/Movie'))
const Search = lazy(() => import('../pages/Search'))
const Favourite = lazy(() => import('../pages/Favourite'))
const PageNotFound = lazy(() => import('../pages/PageNotFound'))

const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{ path: '/movie/:id', element: <Movie /> },
			{ path: '/search', element: <Search /> },
			{ path: '/favourites', element: <Favourite /> },
			{ path: '*', element: <PageNotFound /> }
		]
	}
])

export default AppRouter
