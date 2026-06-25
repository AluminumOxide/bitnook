import { Button, useTheme } from 'react-native-paper'

export default function PageButton({icon, onPress, text}) {
	const theme = useTheme()
	return (<Button icon={icon} onPress={onPress} mode='contained' style={{margin:5}}>
			{text}
		</Button>)
}
