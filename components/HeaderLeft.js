import { View } from 'react-native'
import { IconButton, withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

function HeaderLeft({ theme }) {
	const navigation = useNavigation()
	return (<View style={{flexDirection: 'row'}}>
		<IconButton
			icon='arrow-left'
			size={theme.fonts.titleLarge.fontSize}
			iconColor={theme.colors.primary}
			onPress={()=>navigation.goBack()}/>
	</View>)
}

export default withTheme(HeaderLeft)
