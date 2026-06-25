import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DataTable, IconButton, Menu, Text, useTheme } from 'react-native-paper';
import { FieldValue, /*TableFilter, TableDisplay, TableSort,*/ PageContainer, PageButton } from './';

export default function TableView({ title, idField, sortCols, displayCols, filterCols, getData, rowPress, colDefns, filters, actions=[] }) {

	const theme = useTheme()
	// api query
	const [ query, setQuery ] = useState({
		sort: false,
		order: false,
		filter: filters
	});

	// api data
	const [ data, setData ] = useState([]);
	const fetchData = async() => {
		setData(await getData({ query }));
	}
	useEffect(() => { fetchData() }, [query]);

	// api spec
	//console.log(colDefns)
	const [ cols, setCols ] = useState(Object.fromEntries(Object.entries(colDefns).map(([c,col]) => c=='name'||c=='desc' ? [c, { display: true, ...col }] : [c, col])))

	// list or table mode?
	const [displayMode, setDisplayMode] = useState('list')

	// menu components
	//const display = TableDisplay({ displayCols, cols, setCols })
	//const sort = TableSort({ sortCols, query, setQuery, cols, setCols })
	//const filter = TableFilter({ filterCols, query, setQuery, cols, displayMode })
//

//			{filter}
//
//		{/* menu in table mode */}
//                {displayMode=='table' && <View style={{flexDirection:'row',justifyContext:'flex-start'}}>
//			{display}
//			{sort}
//                </View>}
//		



	// render component
	return (<PageContainer><View>

		<View style={{flexDirection:'row',justifyContent:'flex-end'}}>

			{/* button to switch list/table modes */}
	                {displayMode=='list' && <View style={{flexDirection:'row',justifyContext:'flex-start'}}>
	                        <IconButton
				 size={20}
				 icon='table'
				 onPress={() => setDisplayMode('table')}/>
	                </View>}

			{/* additional actions */}
			{actions.map((action) => {
				return <IconButton
					size={20}
					icon={action.icon}
					onPress={action.press}/>
			})}
		</View>

		{/* table headers */}
		<DataTable>
		{displayMode=='table'&&<DataTable.Header>
		{Object.keys(cols).map(id => {
			const col = cols[id]
			if(!!col.display) {
				return (<DataTable.Title
					 style={{color: theme.colors.onSurfaceDisabled}}
					 key={id}>
					<Text style={{color: theme.colors.onSurfaceDisabled}}>
						{col.name}
					</Text>
					</DataTable.Title>)
			}
		})}
		</DataTable.Header>}

		{/* table contents */}
		{Object.entries(data).map(([key,item]) => (
			<DataTable.Row
			 key={key}
			 onPress={() => rowPress(key) }>
				{Object.keys(cols).map((id,i) => {
					const col = cols[id]
					if(!!col.display) {
						return (<DataTable.Cell
							 key={id}
							 style={ (i==0 && displayMode=='list') ? {justifyContent:'flex-end',paddingRight:10} : ( col.format=='boolean' && displayMode=='list' ? {maxWidth:50} : {} )}>
							<FieldValue
							 data={item[id]}
							 format={col.format}
							 opts={col.opts}
							 layout='short'
							 textStyle={i==0 && displayMode=='list' ? {justifyContent:'flex-end',paddingRight:10} : {}}
							/>
						</DataTable.Cell>)
					}
				})}
			</DataTable.Row>
		))}
		</DataTable>
	</View></PageContainer>)
}
