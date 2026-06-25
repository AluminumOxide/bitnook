import { useState, useContext, useEffect } from 'react'
import { View } from 'react-native'
import { Checkbox, SegmentedButtons, Text, TextInput, useTheme } from 'react-native-paper'
import { FieldInputObj, FieldInputSelect, PageButton } from '../components/'
import { FormContext } from '../contexts/'
import jsonChanges from '../libs/jsonChanges'

export default function FieldInput({ label, format, keys, opts, required=false, visible=true }) {
	const { value, setValue, errors, setErrors } = useContext(FormContext)

	const theme = useTheme()

	const getValue = function() {
		if(!!opts && opts.parent_update === 'value') {
			if(format === 'object') {
				return {[value[opts.parent_field]]:{}}
			} else {
				return value[opts.parent_field]
			}
		} else {
			let kcopy = keys.concat()
			let copy = Object.assign({}, value)
			let lst = kcopy.pop()
			let ptr = copy
			kcopy.map((k) => { if(!ptr[k]){ ptr[k] = {} } ptr = ptr[k] })
			return ptr[lst] ? ptr[lst] : null
		}
	}

	const updateValue = function(val) {
		const vals = jsonChanges.objSet(value, keys, val)
		setValue(vals)
		let copy = Object.assign({}, errors)
		const checks = jsonChanges.objGet(copy, keys.concat('checks'))
		if(Array.isArray(checks)) {
			for(const check of checks) {
				const err = check(vals, keys)
				if(!!err) {
					copy = jsonChanges.objSet(copy, keys.concat('error'), err)
				} else {
					copy = jsonChanges.objSet(copy, keys.concat('error'), false)
				}
			}
		}
		setErrors(copy)
	}

	const getError = function() {
		const err = jsonChanges.objGet(errors, keys)
		if(!!err.error) {
			return err.error
		}
		return false
	}

	const drawError = function() {
		return (<Text style={!getError() ? {display:'none'} : {
			color: theme.colors.onError,
			backgroundColor: theme.colors.error
		}}>{getError()}</Text>)
	}

	const drawLabel = function() {
		return (<Text
		 variant='bodySmall'
		 style={!!getError() ? {color: theme.colors.error} : {color: theme.colors.onSurfaceVariant}}>
			{label}
		</Text>)
	}


	const handleArray = function() {
		const i = keys[keys.length-1]
		const v = jsonChanges.objGet(value, keys.slice(0,-1))
		if(i === 0) {
			if(JSON.stringify(v)==='{}') {
				setValue(jsonChanges.objSet(value, keys.slice(0,-1), ['','']))
			} else {
				setValue(jsonChanges.objSet(value, keys.slice(0,-1), v.concat([''])))
			}
		} else {
			setValue(jsonChanges.objSet(value, keys.slice(0,-1), v.slice(0,i).concat(v.slice(i+1))))
		}
	}

	/* string */
	if(format === 'string') {
		return (<View>
			<TextInput
			 label={label}
			 value={getValue()}
			 error={!!getError()}
			 style={!visible ? {display:'none'} : {}}
			 right={!!opts && opts.array && 
				 <TextInput.Icon
				  icon={opts.array===1?'plus':'minus'}
				  onPress={()=>{handleArray()}}
				 />}
			 onChangeText={value => updateValue(value)}/>
			{drawError()}
		</View>)

	/* multiline string */
	} else if(format === 'multiline') {
		return (<View>
			<TextInput
			 label={label}
			 value={getValue()}
			 multiline={true}
			 error={!!getError()}
			 style={!visible ? {display:'none'} : {}}
			 right={!!opts && opts.array && 
				 <TextInput.Icon
				  icon={opts.array===1?'plus':'minus'}
				  onPress={()=>{handleArray()}}
				 />}
			 onChangeText={value => updateValue(value)}/>
			{drawError()}
		</View>)

	/* integer */	
	} else if(format === 'integer') {
		return (<View>
			<TextInput
			 label={label}
			 value={getValue()}
			 error={!!getError()}
			 style={!visible ? {display:'none'} : {}}
			 right={!!opts && opts.array && 
				 <TextInput.Icon
				  icon={opts.array===1?'plus':'minus'}
				  onPress={()=>{handleArray()}}
				 />}
			 onChangeText={value => updateValue(parseInt(value))}/>
			{drawError()}
		</View>)

	/* date */
	} else if(format === 'date') { // TODO: something fancier
		return (<View>
			<TextInput
			 label={label}
			 value={getValue()}
			 error={!!getError()}
			 style={!visible ? {display:'none'} : {}}
			 right={!!opts && opts.array && 
				 <TextInput.Icon
				  icon={opts.array===1?'plus':'minus'}
				  onPress={()=>{handleArray()}}
				 />}
			 onChangeText={value => updateValue(value)}/>
			{drawError()}
		</View>)

	/* boolean */
	} else if(format === 'boolean') {
		return (<View><View style={{backgroundColor: theme.colors.surfaceVariant, paddingLeft:16,borderBottomWidth:1, borderBottomColor: theme.colors.onSurfaceVariant}}>
			{drawLabel()}
			<Checkbox
			 status={!!getValue() ? 'checked' : 'unchecked'}
			 onPress={() => updateValue(!getValue())}/>
			</View>
			{drawError()}
		</View>)
	
	/* array */ 
	} else if(format === 'array' && (!opts || !opts.format || ['enum','uuid'].indexOf(opts.format) < 0)) {
		return (<View>{(!!getValue()?getValue():['']).map((v,i) => <FieldInput
			 label={label}
			 format={opts.format}
			 keys={keys.concat(i)}
			 opts={{...opts, array:i+1}}
			 required={required}
			 visible={visible}/>)}
		</View>)

	/* enum / uuid */
	} else if(format === 'array' || format === 'enum' || format === 'uuid') {
		return (<View style={{backgroundColor: theme.colors.surfaceVariant, paddingLeft:16, borderBottomWidth:1, borderBottomColor: theme.colors.onSurfaceVariant}}>
		<View style={{}}>
			{drawLabel()}
			<FieldInputSelect
			 multi={format=='array'}
			 keys={keys}
			 val={getValue()}
			 setVal={updateValue}/>
		</View>
			{drawError()}
		</View>)

	/* json object */
	} else if(format === 'object') {
		return (<View><FieldInputObj
			 label={label}
			 val={getValue()}
			 error={!!getError()}
			 opts={opts}
			 keys={keys}
			 valChange={true}/>
			{drawError()}
		</View>)
	}
	return
}
