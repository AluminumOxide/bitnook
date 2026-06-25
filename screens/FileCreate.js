import { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FormContext } from '../contexts/'
import { FormView } from '../components/'
import Bitnook from '../libs/bitnook'

export default function FileCreateScreen({ route }) {

	const bitnook = new Bitnook()
	const navigation = useNavigation()
	const { form } = route.params
	const { value, setValue } = useContext(FormContext)


	useEffect(() => {
		setValue({})
	}, [])

	// handle form submission
	const handleProceed = async function({ name, desc, ...fields }) {
		return bitnook.createFile(form, name, desc, fields)
	}

	// render form
	return <FormView
		title='Create File'
		formFields={Object.keys(bitnook.getFormatDefn(form))}
		nextScreen='FileView'
		fields={bitnook.getFormatDefn(form)}
		proceed={handleProceed}
	/>
}
