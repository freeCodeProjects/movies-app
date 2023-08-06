import { FormEvent, useEffect, useState } from 'react'
import dark from '../../assets/dark.svg'
import light from '../../assets/light.svg'
import Logo from '../ui/Logo'
import searchLogo from '../../assets/search.svg'
import { useNavigate } from 'react-router-dom'

type Theme = 'light' | 'dark'

const Header = () => {
	const navigate = useNavigate()
	const [theme, setTheme] = useState<Theme>(
		(localStorage.getItem('theme') as Theme) || 'light'
	)
	const [search, setSearch] = useState('')

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		//store the value of theme in local storage for future visits
		localStorage.setItem('theme', newTheme)
	}

	const handleSearch = (e: FormEvent) => {
		e.preventDefault()
		if (search.trim().length > 0) {
			navigate(`/search?q=${search.trim()}`)
		}
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
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button className="nav__searchbar__btn">
						<img className="search-logo" src={searchLogo} alt="search logo" />
					</button>
				</form>
				<div className="nav__options">
					<div className="theme-btn" onClick={toggleTheme}>
						{theme === 'dark' ? (
							<img src={dark} alt="dark logo" />
						) : (
							<img src={light} alt="light logo" />
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
