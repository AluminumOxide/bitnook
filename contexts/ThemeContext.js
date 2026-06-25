import { createContext, useState } from 'react'

const ThemeContext = createContext(null)
const { Provider } = ThemeContext

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState({
		colour: '#097ce3ff',
		dark: true,
		font: 'RobotoMono',
		scale: 0
	})

	return (<Provider value={{theme, setTheme}}>
			{children}
		</Provider>)
}

export { ThemeProvider, ThemeContext }
