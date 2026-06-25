import { View } from 'react-native'
import { IconButton, withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

function HeaderRight({ theme }) {
	const navigation = useNavigation()
	return (<View style={{flexDirection: 'row'}}>
		<IconButton
			icon='folder'
			size={theme.fonts.titleLarge.fontSize}
			iconColor={theme.colors.primary}
			onPress={()=>navigation.navigate('FormatList')}/>
		<IconButton
			icon='cog'
			size={theme.fonts.titleLarge.fontSize}
			iconColor={theme.colors.primary}
			onPress={()=>navigation.navigate('Settings')}/>
		<IconButton
			icon='logout'
			size={theme.fonts.titleLarge.fontSize}
			iconColor={theme.colors.primary}
			onPress={()=>navigation.navigate('SignOut')}/>
	</View>)
}

export default withTheme(HeaderRight)
