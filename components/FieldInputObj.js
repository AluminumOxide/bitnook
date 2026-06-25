import { View } from 'react-native'
import { BodyText, FieldInput, TreeList } from '.'

export default function FieldInputObj({label, val, error, opts, keys, valChange}) {
	return (<View>
		<BodyText>{label}</BodyText>
		<TreeList
		 contents={val}
		 keys={keys}
		 leaf={(item,content,key)=><FieldInput label={item} format='string' keys={key.concat([item])} opts={opts}/>}
		 branch={(item,press,key)=><FieldInput label={item} format='string' keys={key} opts={opts}/>}/>
	</View>)
}
