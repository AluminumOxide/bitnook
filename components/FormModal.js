import { Modal, Portal, Text, useTheme } from 'react-native-paper'
import { View } from 'react-native'
import { Form } from '.'

export default function FormModal({ title, formFields, reqFields, fields, keys=[], getVisibility, submit, cancel }) {
	const theme = useTheme()
	return (<Portal>
		<Modal
		 visible={getVisibility()}
		 contentContainerStyle={{backgroundColor: theme.colors.background, justifyContent: 'center'}}
		 onDismiss={cancel}>
			<Text
			 variant='titleMedium'
			 style={{alignSelf:'center'}}>
				{title}
			</Text>
			{Form({
				formFields,
				reqFields,
				fields,
				keys,
				submit,
				cancel
			})}
		</Modal>
	</Portal>)
}
