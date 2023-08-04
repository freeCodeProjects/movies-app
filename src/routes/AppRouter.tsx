import { createBrowserRouter } from 'react-router-dom'
import Root from '../components/layout/Root'
import Home from '../pages/Home'

const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <h1>OOps Error occured</h1>,
		children: [{ index: true, element: <Home /> }]
	}
])

export default AppRouter
