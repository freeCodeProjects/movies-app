import Loader from './Loader'
import Logo from './Logo'

const PageLoader = () => {
	return (
		<div className="page-loader">
			<Logo />
			<div>
				<Loader />
			</div>
		</div>
	)
}
export default PageLoader
