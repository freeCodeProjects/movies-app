import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Root from '../components/layout/Root'
const Home = lazy(() => import('../pages/Home'))
const Movie = lazy(() => import('../pages/Movie'))
const Search = lazy(() => import('../pages/Search'))

const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <h1>OOps Error occured</h1>,
		children: [
			{ index: true, element: <Home /> },
			{ path: '/movie/:id', element: <Movie /> },
			{ path: '/search', element: <Search /> }
		]
	}
])

export default AppRouter
