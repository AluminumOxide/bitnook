import { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useTheme, DataTable } from 'react-native-paper';
import { PageContainer, FieldValue, BodyText, PageButton, Paragraph } from '.';

export default function DetailView({ getData, colDefns, actions }) {

	// load data
	const [ data, setData ] = useState([]);
	const fetchData = async() => {
		setData(await getData());
	}
	useEffect(() => { fetchData() }, []);
	
	const longFields = Object.keys(colDefns).filter((f) => ['name','desc'].indexOf(f) < 0)
		.filter((f) => ((colDefns[f].format == 'object' && typeof(data[f]) == 'object') 
			|| (colDefns[f].format =='array' && !!data[f] && data[f].length > 5) 
			|| (colDefns[f].format === 'multiline')))
	const shortFields = Object.keys(colDefns).filter((f) => ['name','desc'].indexOf(f) < 0)
		.filter((f) => longFields.indexOf(f) == -1)
	
	// render component
	const theme = useTheme()
	return (<PageContainer>
		<View style={{flexDirection: 'column'}}>
<View style={{flexDirection:(useWindowDimensions().width<600)?'column':'row-reverse',justifyContent:'space-around'}}>	
		{/* action buttons */}
		<View style={{flexGrow:1}}>
			{actions.map((act) => (
				<PageButton
					text={act.name}
					icon={act.icon}
					onPress={act.press}/>
			))}
		</View>

		{/* short fields */}
		{shortFields.length>0 && <View style={{flexGrow:1,paddingRight:20}}>
		<DataTable>
		{shortFields.map((i,index) => (<DataTable.Row style={{borderBottomWidth:0,backgroundColor:index%2==0?theme.colors.background:theme.colors.surfaceVariant}}>
			<DataTable.Cell style={{justifyContent:'flex-end'}}><BodyText style={{fontWeight:'bold'}}>{colDefns[i].name}: </BodyText></DataTable.Cell>
			<DataTable.Cell><FieldValue data={data[i]} format={colDefns[i].format} opts={colDefns[i].opts}/></DataTable.Cell>
		</DataTable.Row>))}
		</DataTable>
		</View>}
</View>
		{/* description */}
		<Paragraph title='Description' style={{paddingTop:15}}>
			<BodyText>{data.desc}</BodyText>
		</Paragraph>

		{/* long fields */}
		{longFields.map((i) => (<Paragraph title={colDefns[i].name} style={{paddingTop:20}}>
			<FieldValue data={data[i]} format={colDefns[i].format} opts={colDefns[i].opts}/>
			</Paragraph>))}

	</View>
	</PageContainer>)
}


