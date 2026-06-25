import { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

export default function TreeList({ title, contents, buttons=false }) {
	
	// show contents?
	const [show, setShow] = useState(true)

	// render component
	const theme = useTheme()
	return (<View>

		{/* title */}
		<View
		 style={{
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',

		 }}>
			<View style={{
				flexDirection: 'row',
				alignItems: 'center'
			}}>
				<IconButton
					icon={show?'minus-box-outline':'plus-box-outline'}
					onPress={() => setShow(!show)}
					iconColor={theme.colors.primary}
					size={theme.fonts.labelMedium.fontSize}/>
				<Text
				 style={{
					marginRight: 5,
					marginLeft: 5,
					fontWeight: 'bold'
				 }}
				 onPress={() => setShow(!show)}>
					{title}
				</Text>

				{!!buttons && buttons}
			</View>
		</View>

		{/* contents */}
		{!!show && <View style={{
			paddingLeft: 5,
			marginLeft: 19,
			borderLeftWidth: 1,
			borderLeftColor: theme.colors.primary
		}}>
			{contents}
		</View>}
	</View>)
}
