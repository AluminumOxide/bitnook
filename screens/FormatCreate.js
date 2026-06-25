import { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FormContext } from '../contexts/'
import { FormView } from '../components/'
import Bitnook from '../libs/bitnook'

export default function FormatCreateScreen({ route }) {

	const bitnook = new Bitnook()
	const navigation = useNavigation()
	const { value, setValue } = useContext(FormContext)

	useEffect(() => {
		setValue({})
	}, [])

	// handle form submission
	const handleProceed = async function({ name, desc, defn }) {
		return bitnook.createFormat(name, desc, defn)
	}

	// render form
	return <FormView
		title='Create Format'
		formFields={Object.keys(bitnook.getFormatDefn())}
		nextScreen='FormatView'
		fields={bitnook.getFormatDefn()}
		proceed={handleProceed}
	/>
}
