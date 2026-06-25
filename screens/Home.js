import { Text, View } from 'react-native'
import { useContext } from 'react'
import { BitnookContext } from '../contexts/'
import { useNavigation } from '@react-navigation/native'
import { Link } from '@react-navigation/native'
import { withTheme } from 'react-native-paper'

function Index({theme}) {
	const { bitnook, setBitnook } = useContext(BitnookContext)
	const navigation = useNavigation()
    	return (<View>
		<Link screen='FormatList'>My Files</Link>
		<Link screen='Settings'>Settings</Link>
		<Link screen='SignOut'>Sign Out</Link>
	</View>)
}
export default withTheme(Index)
