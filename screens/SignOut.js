import { withTheme } from 'react-native-paper'
import Bitnook from '../libs/bitnook'
import { ConfirmView } from '../components/'

function SignOutScreen({ route, theme }) {
	const bitnook = new Bitnook()
	const handleProceed = async function() {
		return { }
	}
	return ConfirmView({
		question: 'Would you like to sign out?',
		proceed: handleProceed,
		nextScreen: 'SignIn'
	})
}
export default withTheme(SignOutScreen)
