import { Link } from 'react-router-dom'
import pageNotFoundImage from '../assets/pageNotFound.svg'

const PageNotFound = () => {
	return (
		<div className="container page-not-found">
			<h1 className="heading-1">Page not found...</h1>
			<img
				src={pageNotFoundImage}
				alt="page not found"
				className="page-not-found__image"
			/>
			<Link to="/">
				<button className="go-to-home-btn">Go to Home</button>
			</Link>
		</div>
	)
}

export default PageNotFound
