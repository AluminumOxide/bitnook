import { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

export default function Paragraph({ title, children, buttons=false }) {
	
	// show contents?
	const [show, setShow] = useState(true)

	// render component
	const theme = useTheme()
	return (<View>

		{/* title */}
		<View
		 style={{
			flexDirection: 'row',
			backgroundColor: theme.colors.primaryContainer,
			justifyContent: 'space-between',
			alignItems: 'center',
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.primary
		 }}>
			<View style={{
				flexDirection: 'row',
				alignItems: 'center'
			}}>
				<Text
				 style={{
					marginRight: 5,
					marginLeft: 10,
					fontWweight: 'bold'
				 }}
				 onPress={() => setShow(!show)}>
					{title}
				</Text>
				<IconButton
					icon={show?'arrow-up':'arrow-down'}
					onPress={() => setShow(!show)}
					iconColor={theme.colors.primary}
					size={theme.fonts.labelMedium.fontSize}/>
				{!!buttons && buttons}
			</View>
		</View>

		{/* children */}
		{!!show && <View style={{
			paddingLeft: 5,
			marginLeft: 5
		}}>
			{children}
		</View>}
	</View>)
}
