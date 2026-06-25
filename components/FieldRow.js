import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { Paragraph, FieldValue } from '.'

export default function FieldRow({ label, data, format, layout, opts={} }) {
	const theme = useTheme()
	if((format == 'object' && typeof(data) == 'object') || (format =='array' && !!data && data.length > 5) || (format === 'multiline' && layout != 'short')) {
		return (<Paragraph title={label}>
			<FieldValue data={data} format={format} layout={layout} opts={opts}/>
			</Paragraph>)

	} else {
		return (<View style={{flexDirection: 'row'}}>
			<Text style={{fontWeight:'bold'}}>{label}: </Text>
			<FieldValue data={data} format={format} layout={layout} opts={opts}/>
		</View>)
	}
}
