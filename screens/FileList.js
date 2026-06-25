import { Text, View } from 'react-native'
import { Link, useNavigation } from '@react-navigation/native'
import { withTheme } from 'react-native-paper'
import { TableView } from '../components/'
import Bitnook from '../libs/bitnook'

function FileList({ route, theme }) {
	const bitnook = new Bitnook()
	const navigation = useNavigation()
	const { form } = route.params
	const getData = async() => {
		return bitnook.getFormatFiles(form)
	}
	const handlePress = async(file) => {
		return navigation.navigate('FileView', {form, file})
	}
	return <TableView
		title='List Files'
		idField='name'
		getData={getData}
		rowPress={handlePress}
		colDefns={bitnook.getFormatDefn(form)}
	       />
}
export default withTheme(FileList)
