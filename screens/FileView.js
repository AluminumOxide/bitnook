import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { withTheme } from 'react-native-paper'
import { DetailView } from '../components/'
import Bitnook from '../libs/bitnook'

function FileView({ route, theme }) {
	const bitnook = new Bitnook()
	const navigation = useNavigation()
	const { form, file } = route.params	
	return (<DetailView
		getData={() => bitnook.getFile(form, file)}
		colDefns={bitnook.getFormatDefn(form)}
		actions={[{
			name: 'Update File',
			icon: 'pencil',
			press: () => navigation.navigate('FileUpdate', {form, file})
		},{
			name: 'Delete File',
			icon: 'delete',
			press: () => navigation.navigate('FileDelete', {form, file})
		}]}/>)
}
export default withTheme(FileView)
