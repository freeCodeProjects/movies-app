import { Link } from 'react-router-dom'
import errorImage from '../assets/error.svg'

const ErrorPage = () => {
	return (
		<div className="container error-page">
			<h1 className="heading-1">Something bad just happened...</h1>
			<img src={errorImage} alt="error image" className="error-page__image" />
			<Link
				target="_blank"
				to="https://github.com/freeCodeProjects/movies-app/issues"
			>
				<button className="report-issue-btn">Report Issue</button>
			</Link>
		</div>
	)
}
export default ErrorPage
