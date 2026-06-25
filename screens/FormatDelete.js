import { withTheme } from 'react-native-paper'
import Bitnook from '../libs/bitnook'
import { ConfirmView } from '../components/'

function FormatDeleteScreen({ route, theme }) {
	const bitnook = new Bitnook()
	const form = route.params.form
	const handleProceed = async function() {
		return bitnook.deleteFormat(form)
	}
	return ConfirmView({
		question: 'Would you like to delete this format and all associated files?',
		proceed: handleProceed,
		nextScreen: 'FormatList'
	})
}
export default withTheme(FormatDeleteScreen)
