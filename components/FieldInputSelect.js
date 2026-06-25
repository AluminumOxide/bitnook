import { View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useContext } from 'react'
import { FormContext } from '../contexts'
import jsonChanges from '../libs/jsonChanges'

export default function FieldInputSelect({keys, val, setVal}) 
{
	const theme = useTheme()
	const { data, setData } = useContext(FormContext)
	return (<View style={{
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center'
	}}>
		{Array.isArray(jsonChanges.objGet(data, keys)) && jsonChanges.objGet(data, keys).map(opt => (
			<Text
			 key={opt.id}
			 style={opt.id==val ? {backgroundColor: theme.colors.primary, color: theme.color.onPrimary} : {backgroundColor: theme.colors.primaryContainer, color: theme.colors.primary}}
			 onPress={() => setVal(opt.id)}>
				{opt.name}
			</Text>
		))}
	</View>)}
