import { Text, View } from 'react-native'
import { Link, useNavigation } from '@react-navigation/native'
import { withTheme } from 'react-native-paper'
import { TableView } from '../components/'
import Bitnook from '../libs/bitnook'

function FormatList({ route, theme }) {
	const bitnook = new Bitnook()
	const navigation = useNavigation()
	const getData = async() => {
		return bitnook.getFormats()
	}
	const handlePress = async(form) => {
		return navigation.navigate('FormatView', {form})
	}
	return <TableView
		title='List File Formats'
		idField='name'
		getData={getData}
		rowPress={handlePress}
		colDefns={bitnook.getFormatDefn()}
		actions={[{
			icon: 'plus',
			press: () => navigation.navigate('FormatCreate')
		}]}/>
}
export default withTheme(FormatList)
