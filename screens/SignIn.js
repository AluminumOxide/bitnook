import { Text, View } from 'react-native'
import { useContext } from 'react'
import { Link } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { withTheme } from 'react-native-paper'
import { BitnookContext } from '../contexts/'
import { BodyText, PageButton, PageContainer } from '../components/'

function SignIn({ theme }) {
	const { bitnook, setBitnook } = useContext(BitnookContext)
	const navigation = useNavigation()
	return (<PageContainer><View>
	    <PageButton icon='login' text='Sign In' onPress={()=>navigation.navigate('FormatList')}/>
	    <Link screen='SignUp'><BodyText>Don't have an account?</BodyText></Link>
	</View></PageContainer>)
}
export default withTheme(SignIn)
