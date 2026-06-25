import { FlatList, View } from 'react-native'
import { Link, useNavigation } from '@react-navigation/native'
import { Checkbox, Text, useTheme } from 'react-native-paper'
import { Paragraph, BodyText, TreeList } from '.'
import Bitnook from '../libs/bitnook'

export default function FieldValue({ data, format, layout, opts={}, keys=[], textStyle={} }) {

	const theme = useTheme()
	const bitnook = new Bitnook()
	const navigation = useNavigation()

	if(format === 'boolean') {
		return(<BodyText>
				{!!data ? 'Yes' : 'No'}
			</BodyText>)
	
	} else if(format === 'date') {
		return(<BodyText>
			{!!data ? (new Date(data)).toLocaleDateString("en-CA", {
				month:'long',
				day:'numeric',
				year:'numeric'
			}) : 'Never'}</BodyText>)
			
	} else if(format === 'uuid') {
		const form = opts.link
		const file = data
		const handleLink = async function() {
			if(!!opts && !!data) {
				navigation.push('FileView', {form, file})
			}
		}
		return(<Text onPress={handleLink} style={textStyle}>
				{bitnook.getFileName(form,file)}
			</Text>)

	} else if(format === 'array') {
		if(!!data && data.length > 5) {
			return (<FlatList data={data}
				renderItem={({item}) => (<View style={{flexDirection:'row'}}>
					<BodyText style={{}}>• </BodyText>
					<FieldValue
						data={item}
						format={!!opts && !!opts.format ? opts.format : 'string'}
						opts={opts}/>

				</View>)}
			/>)
		} else {
			return(<View style={{flexDirection: 'row', alignItems: 'center', width:'100%'}}>
				{(!!opts && !!opts.format && !!data) && data.map((d,i) => (<BodyText><FieldValue data={d} format={opts.format} opts={opts} />{(i != data.length-1)?', ':''}</BodyText>))}
				{(!opts || !opts.format || !data) && <BodyText style={textStyle}>{!data ? '' : data.join(', ')}</BodyText>}
			</View>)
		}
	
	} else if(format === 'object') {
		return <TreeList
			contents={data}
			leaf={(item,content) => (<View style={{flexDirection:'row'}}>
				<BodyText>{item}: </BodyText>
				<FieldValue data={content} format='string'/></View>)}
			branch={(item,press) => (<BodyText
				style={{color:theme.colors.primary,fontWeight:'bold'}}
				onPress={press}>
					{item}
			 </BodyText>)}/>

	} else if(format === 'enum') {
		let val = data
		if(!!opts && !!opts.vals) {
			val = opts.vals.filter((f) => f.id === data)
			if(!!val && val.length === 1) {
				val = val[0].name
			}
		}
		return(<BodyText style={textStyle}>{val}</BodyText>)

	// string, multiline, integer
	} else {
		return(<BodyText style={textStyle}>{data}</BodyText>)
	}
}
