import { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FormContext } from '../contexts/'
import { FormView } from '../components/'
import Bitnook from '../libs/bitnook'

export default function FileUpdateScreen({ route }) {

	const bitnook = new Bitnook()
	const navigation = useNavigation()
	const { file, form } = route.params
	
	// manages form values
	const { value, setValue } = useContext(FormContext)
	useEffect(() => {
		if(Object.keys(value).length === 0) {
			setValue(bitnook.getFile(form, file))
		}
	}, [])

	// handle form submission
	const handleProceed = async function({ name, desc, ...fields }) {
		return bitnook.updateFile(form, file, name, desc, fields)
	}

	// render form
	return <FormView
		title='Update File'
		formFields={Object.keys(bitnook.getFile(form, file))}
		nextScreen='FileView'
		fields={bitnook.getFormatDefn(form)}
		proceed={handleProceed}
	/>
}
