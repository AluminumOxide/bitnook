import { withTheme } from 'react-native-paper'
import Bitnook from '../libs/bitnook'
import { ConfirmView } from '../components/'

function FileDeleteScreen({ route, theme }) {
	const bitnook = new Bitnook()
	const { form, file } = route.params
	const handleProceed = async function() {
		bitnook.deleteFile(form, file)
		return { form }
	}
	return ConfirmView({
		question: 'Would you like to delete this file?',
		proceed: handleProceed,
		nextScreen: 'FileList'
	})
}
export default withTheme(FileDeleteScreen)
