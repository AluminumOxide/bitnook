import { useContext, useEffect } from 'react'
import { FormView } from '../components/'
import { FormContext, ThemeContext } from '../contexts/'

export default function SettingsScreen({}) {

	const {theme, setTheme} = useContext(ThemeContext)
	const {value, setValue} = useContext(FormContext)

	const defn = {
		dark: {
			name: 'Dark Mode?',
			desc: 'Display in dark mode?',
			format: 'boolean'
		},
		colour: {
			name: 'Primary Colour',
			desc: 'The primary colour theme',
			format: 'string'
		},
		font: {
			name: 'Font Family',
			desc: 'The font family for the app',
			format: 'string'
		},
		scale: {
			name: 'Font Size',
			desc: 'The relative font size for the app',
			format: 'integer'
		}
	}

	useEffect(() => {
		setValue(theme)
	}, [])

	const handleProceed = async function(newTheme) {
		setTheme(newTheme)
	}

	return <FormView
		title='Settings'
		formFields={Object.keys(defn)}
		nextScreen='FormatList'
		fields={defn}
		proceed={handleProceed}
	/>
}
