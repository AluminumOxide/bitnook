import { ScrollView, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function PageContainer({children}) {
	const theme = useTheme()
	return (<ScrollView
		 style={{
			...theme.fonts.bodyMedium,
			padding: 20,
			flexDirection: 'column',
			spaceBetween: 20,
			backgroundColor: theme.colors.background
		 }}>
			{children}
	</ScrollView>)
}
