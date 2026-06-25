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
			return (<FlatList 
				data={data}
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
				<BodyText style={textStyle}> {data.join(',')}</BodyText>
			</View>)
		}
	
	} else if(format === 'object' && typeof(data) === 'object') {
		if(Object.values(data).reduce((p,c) => p || typeof(c) == 'object', false)) {
		return (<FlatList
			 data={!!data ? Object.keys(data) : []}
			 renderItem={({item}) => (
				<TreeList
				 title={item}

				 contents={
					<FieldValue
					 data={data[item]}
					 format={Array.isArray(data[item]) ? 'array' : typeof data[item] == 'object' ? 'object' : 'string'}
					 keys={keys.concat([item])}/>
				 }/>)}
			/>)
		}
		//<BodyText style={{}}>{index>Object.entries(data).length-2?'└ ':'├ '}</BodyText>
		return (<FlatList 
			data={Object.entries(data)}
			renderItem={({item, index}) => (<View style={{flexDirection:'row'}}>

				<BodyText style={{fontWeight:'bold'}}>•{item[0]}: </BodyText>
				<FieldValue
					data={item[1]}
					format={!!opts && !!opts.format ? opts.format : typeof(data)=='object' ? 'object' : 'string'}
					opts={opts}/>

			</View>)}
		/>)

	} else if(format === 'enum') {
		let val = data
		if(!!opts && !!opts.vals) {
			val = opts.vals[data]
		}
		return(<BodyText style={textStyle}>{val}</BodyText>)

	// string, multiline, integer
	} else {
		return(<BodyText style={textStyle}> {data}</BodyText>)
	}
}
