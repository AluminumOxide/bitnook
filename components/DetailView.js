import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { PageContainer, FieldRow, BodyText, PageButton, Paragraph } from '.';

export default function DetailView({ getData, colDefns, actions }) {

	// load data
	const [ data, setData ] = useState([]);
	const fetchData = async() => {
		setData(await getData());
	}
	useEffect(() => { fetchData() }, []);
	
	// render component
	const theme = useTheme()
	return (<PageContainer>
		<View style={{flexDirection: 'column'}}>

		{/* action buttons */}
		<View style={{paddingBottom:15}}>
			{actions.map((act) => (
				<PageButton
					text={act.name}
					icon={act.icon}
					onPress={act.press}/>
			))}
		</View>

		{/* description */}
		<Paragraph title='Description'>
			<BodyText>{data.desc}</BodyText>
		</Paragraph>

		{/* field details */}
		<View style={{paddingTop:10}}>
			{Object.keys(colDefns).filter((f) => ['name','desc'].indexOf(f) < 0).map((col) => (<FieldRow
				key={'ld-'+col}
				label={colDefns[col].name}
				data={data[col]}
				format={colDefns[col].format}
				opts={colDefns[col].opts}/>))}
		</View>
	</View>
	</PageContainer>)
}

