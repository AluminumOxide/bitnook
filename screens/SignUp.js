import { Text, View } from 'react-native'
import { useContext } from 'react'
import { Link } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { withTheme } from 'react-native-paper'
import { BitnookContext } from '../contexts/'
import { PageButton, PageContainer } from '../components/'

function SignUp({ theme }) {
	const { bitnook, setBitnook } = useContext(BitnookContext)
	const navigation = useNavigation()
	return (<PageContainer><View>
	    <PageButton icon='login' text='Sign Up' onPress={()=>navigation.navigate('FormatList')}/>
	</View></PageContainer>)
}
export default withTheme(SignUp)
