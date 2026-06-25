import { useContext, useEffect, useState } from 'react'
import { FormContext } from '../contexts/'
import { FormView } from '../components/'
import Bitnook from '../libs/bitnook'

export default function FormatUpdateScreen({ route }) {
	const bitnook = new Bitnook()
	const form = route.params.form
	const { value, setValue } = useContext(FormContext)

	useEffect(() => {
		setValue({
			name: bitnook.getFormatName(form),
			desc: bitnook.getFormatDesc(form),
			defn: bitnook.getFormatDefn(form)
		})
	}, [])

	// handle form submission
	const handleProceed = async function({ name, desc, defn }) {
		return bitnook.updateFormat(form, name, desc, defn)
	}

	// render form
	return <FormView
		title='Update Format'
		formFields={Object.keys(bitnook.getFormatDefn())}
		nextScreen='FormatView'
		fields={bitnook.getFormatDefn()}
		proceed={handleProceed}
	/>
}
