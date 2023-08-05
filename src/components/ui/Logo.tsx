import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
const Logo = () => {
	return (
		<Link to="/" className="nav__info">
			<img className="nav__info__logo" src={logo} alt="app logo" />
			<h3 className="nav__info__title">React Movies</h3>
		</Link>
	)
}
export default Logo
