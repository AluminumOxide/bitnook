import { View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useContext } from 'react'
import { FormContext } from '../contexts'
import { BodyText } from '.'
import jsonChanges from '../libs/jsonChanges'

export default function FieldInputSelect({keys, val, setVal, multi=false}) { // TODO multi
	const theme = useTheme()
	const { data, setData } = useContext(FormContext)
	const getValue = function(id) {
		if(!multi) {
			return id===val
		}
		return Array.isArray(val) && val.indexOf(id) >= 0
	}
	const setValue = function(id) {
		if(!multi) {
			return setVal(id)
		}
		if(!val) {
			return setVal([id])
		}
		if(!getValue(id)) {
			return setVal(val.concat([id]))
		}
		return setVal(val.filter((v) => v!== id))
	}
	return (<View style={{
		flexDirection: 'row',
		flexWrap: 'wrap'
	}}>
		{Array.isArray(jsonChanges.objGet(data, keys)) && jsonChanges.objGet(data, keys).map(opt => (
			<BodyText
			 key={opt.id}
			 style={!!getValue(opt.id) ? {padding:5,margin:5,backgroundColor: theme.colors.primary, color: theme.colors.onPrimary} : {padding:5,margin:5,backgroundColor: theme.colors.primaryContainer, color: theme.colors.primary}}
			 onPress={() => setValue(opt.id)}>
				{opt.name}
			</BodyText>
		))}
	</View>)
}
