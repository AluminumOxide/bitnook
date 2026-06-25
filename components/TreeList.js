import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { BodyText } from '.'

export default function TreeList({ contents, leaf, branch, lst=[], keys=[] }) {

	const theme = useTheme()
	const styles = StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		lines: {
			color: theme.colors.primaryContainer
		},
		leafLabel: {
			fontWeight:'bold'
		}
	})

	// handle non-objects
	if(typeof(contents) != 'object') {
		return leaf(contents,'')
	}
	
	// manage visibility
	const [show, setShow] = useState(Object.fromEntries(
		Object.entries(contents).map(([i,c]) => [i, true])))

	// draw tree lines
	const drawLines = function(index) {
		return (<View style={styles.container}>
			{lst.map((i) => 
				<BodyText style={styles.lines}>{!i?'│ ':'  '}</BodyText>)}
			<BodyText style={styles.lines}>
				{index>Object.entries(contents).length-2?'└─':'├─'}
			</BodyText>
		</View>)
	}

	// render component
	return (<FlatList
		 data={!!contents ? Object.keys(contents) : []}
		 renderItem={({item,index}) => (<View>

		{/* draw leaf node */}
		{(typeof(contents[item]) != 'object') && <View style={styles.container}>
			{drawLines(index)}
			{leaf(item,contents[item],keys)}
		</View>}

		{/* draw branch node */}
		{(typeof(contents[item]) == 'object') && <View>
			<View style={styles.container}>
				<View style={styles.container}>
					{drawLines(index)}
					{branch(item, () => setShow({...show, [item]: !show[item]}),keys)} 
				</View>
			</View>
			{!!show[item] && <TreeList
				contents={contents[item]}
				leaf={leaf}
				branch={branch}
				lst={lst.concat([index>Object.entries(contents).length-2])}
				keys={keys.concat([item])}
			/>}
		</View>}

	</View>)}/>)
}


