import { useContext } from 'react'
import { BitnookContext } from '../contexts/'

export default class Bitnook {
	bitnook: object
	constructor() {
		const { bitnook } = useContext(BitnookContext)
		this.bitnook = bitnook
	}
	getFormats(): object {
		return this.bitnook.files
	}
	getFormat(form: string): object {
		return this.getFormats()[form]
	}
	getFormatName(form: string): string {
		return this.getFormat(form).name
	}
	getFormatDesc(form: string): string {
		return this.getFormat(form).desc
	}
	getFormatDefn(form: string): object {
		if(!form) {
			return this.bitnook.config.format.defn
		}
		return this.getFormat(form).defn
	}
	getFormatFiles(form: string): object {
		return this.getFormat(form).files
	}
	getFile(form: string, file: string): object {
		return this.getFormatFiles(form)[file]
	}
	getFileName(form: string, file: string): string {
		if(!!this.getFile(form, file)) { // TODO: fix
		return( this.getFile(form, file)).name
		} else {
			return ''
		}
	}
	getFileDesc(form: string, file: string): string {
		return this.getFile(form, file).desc
	}

	listFormats(search: object): array {
		// TODO: actually search
		return Object.entries(this.getFormats())
			.map(([id,val]) => ({id, ...val}))
	}
	listFormatFiles(form: string, search: object): array {
		// TODO: actually search
		return Object.entries(this.getFormatFiles(form))
			.map(([id,val]) => ({id, ...val}))
	}

	createFormat(name: string, desc: string, defn: object): object {
		const id = name.replace(' ','') // TODO: make unique
		console.log(`Create Format: ${id}: ${name}: ${desc}: ${JSON.stringify(defn)}`)
		// TODO: actually create
		return { form: id }
	}
	createFile(form: string, name: string, desc: string, fields: object = {}): object {
		const id = name.replace(' ','') // TODO: make unique
		console.log(`Create File: ${form}/${id}: ${name}: ${desc}: ${JSON.stringify(fields)}`)
		// TODO: actually create
		return { form, file: id }
	}
	
	updateFormat(form: string, name: string, desc: string, defn: object): object {
		console.log(`Update Format: ${form}: ${name}: ${desc}: ${JSON.stringify(defn)}`)
		// TODO: actually update
		return { form }
	}
	updateFile(form: string, file: string, name: string, desc: string, fields: object = {}): object {
		console.log(`Update File: ${form}/${file}: ${name}: ${desc}: ${JSON.stringify(fields)}`)
		// TODO: actually update
		return { form, file }
	}

	deleteFormat(form: string): null {
		console.log(`Delete Format: ${form}`)
		// TODO: actually delete
		return
	}
	deleteFile(form: string, file: string): null {
		console.log(`Delete File: ${form}: ${file}`)
		// TODO: actually delete
		return
	}
}
