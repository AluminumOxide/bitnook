import { Text } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function BodyText({style, children, onPress=false}) {

	const theme = useTheme()
	return (<Text style={{
		...theme.fonts.bodyMedium,
		color: theme.colors.onBackground,
		...style}}
		onPress={onPress}>
			{children}
		</Text>)
}
