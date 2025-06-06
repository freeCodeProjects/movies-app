import { FormEvent, useEffect, useRef, useState } from 'react'
import dark from '../../assets/dark.svg'
import light from '../../assets/light.svg'
import Logo from '../ui/Logo'
import searchLogo from '../../assets/search.svg'
import { Link, useNavigate } from 'react-router-dom'
import favourite from '../../assets/favourite.svg'

type Theme = 'light' | 'dark'

const Header = () => {
	const navigate = useNavigate()
	const [theme, setTheme] = useState<Theme>(
		(localStorage.getItem('theme') as Theme) || 'light'
	)
	const searchInputRef = useRef<HTMLInputElement>(null)

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		//store the value of theme in local storage for future visits
		localStorage.setItem('theme', newTheme)
	}

	const handleSearch = (e: FormEvent) => {
		e.preventDefault()
		const query = searchInputRef.current?.value.trim() || ''
		if (query.length > 0) {
			navigate(`/search?q=${query}`)
		}
		searchInputRef.current?.blur()
	}

	useEffect(() => {
		document.body.dataset.theme = theme
	}, [theme])

	return (
		<header className="header">
			<div className="container nav">
				<Logo />
				<form className="nav__searchbar" onSubmit={handleSearch}>
					<input
						className="nav__searchbar__input"
						type="search"
						placeholder="search movies"
						ref={searchInputRef}
					/>
					<button className="nav__searchbar__btn">
						<img className="search-logo" src={searchLogo} alt="search logo" />
					</button>
				</form>
				<div className="nav__options">
					<div className="theme-btn" onClick={toggleTheme}>
						{theme === 'light' ? (
							<img src={dark} alt="dark logo" />
						) : (
							<img src={light} alt="light logo" />
						)}
					</div>
					<Link to="/favourites">
						<img
							className="favourite-btn"
							src={favourite}
							alt="favourite logo"
						/>
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
