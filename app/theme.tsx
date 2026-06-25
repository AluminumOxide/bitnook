import Color from 'color'
import { useFonts, getLoadedFonts } from 'expo-font'
import { useContext, useEffect } from 'react'
import { MD3LightTheme as DefaultTheme, PaperProvider, configureFonts } from 'react-native-paper'
import { argbFromHex, themeFromSourceColor } from '@material/material-color-utilities'
import { ThemeContext } from '../contexts/'
import Bitnook from '../libs/bitnook'

export default function ThemeStack({children}) {
	const bitnook = new Bitnook()

	const { theme } = useContext(ThemeContext)
	const [loaded, error] = useFonts(Object.fromEntries(Object.entries(
		bitnook.getFormatFiles('font')).map(([i, o]) => [o.name, o.path])
	))
	useEffect(() => {
		console.log(getLoadedFonts())
	}, [loaded, error])

	return(<PaperProvider theme={{
		...DefaultTheme,
		dark: theme.dark,
		colors: Object.fromEntries(Object.entries(
			themeFromSourceColor(argbFromHex(theme.colour))
				.schemes[!theme.dark?'light':'dark'].props)
			.map(([key,value]) => 
			     [key, Color(value).rgb().toString()])),
		fonts: Object.fromEntries(Object.entries(DefaultTheme.fonts).map(([key,value])=>
			[key, {
				fontFamily: theme.font,
				letterSpacing: value.letterSpacing,
				fontWeight: value.fontWeight,
				lineHeight: value.lineHeight+theme.scale,
				fontSize: value.fontSize+theme.scale
			}])) 
		}}>
			{children}
	</PaperProvider>)
}

