import { useEffect, useState } from 'react'
import dark from '../../assets/dark.svg'
import light from '../../assets/light.svg'
import Logo from '../ui/Logo'

type Theme = 'light' | 'dark'

const Header = () => {
	const [theme, setTheme] = useState<Theme>(
		(localStorage.getItem('theme') as Theme) || 'light'
	)

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		//store the value of theme in local storage for future visits
		localStorage.setItem('theme', newTheme)
	}

	useEffect(() => {
		document.body.dataset.theme = theme
	}, [theme])

	return (
		<header className="header">
			<div className="container nav">
				<Logo />
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
