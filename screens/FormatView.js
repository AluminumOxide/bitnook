import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { withTheme } from 'react-native-paper'
import { DetailView } from '../components/'
import Bitnook from '../libs/bitnook'

function FormatView({ route, theme }) {
	const bitnook = new Bitnook()
	const navigation = useNavigation()
	const { form } = route.params	
	return (<DetailView
		getData={() => bitnook.getFormat(form)}
		colDefns={{defn:{
			name: 'Definition',
			desc: 'Format Definition',
			format: 'object'
		}}}
		actions={[{
			name: 'Create File',
			icon: 'plus',
			press: () => navigation.navigate('FileCreate', {form})
		},{
			name: 'Update Format',
			icon: 'pencil',
			press: () => navigation.navigate('FormatUpdate', {form})
		},{
			name: 'Delete Format',
			icon: 'delete',
			press: () => navigation.navigate('FormatDelete', {form})
		},{
			name: 'List Files',
			icon: 'file',
			press: () => navigation.navigate('FileList', {form})
		}]}/>)
}
export default withTheme(FormatView)
