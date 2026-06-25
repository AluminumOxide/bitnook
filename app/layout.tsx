import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MD3LightTheme as DefaultTheme, PaperProvider, withTheme } from 'react-native-paper'
import { HeaderLeft, HeaderRight } from '../components/'
import screens from '../screens/'
import Bitnook from '../libs/bitnook'

function RootStack({ theme }) {
	const bitnook = new Bitnook()
	const Stack = createNativeStackNavigator()
	return(<Stack.Navigator
	  screenOptions={{
	   headerTintColor: theme.colors.primary,
	   headerStyle: {backgroundColor: theme.colors.primaryContainer},
	   headerTitleAlign: 'center',
	   headerTitleStyle: theme.fonts.titleLarge,
	   headerLeft: (props) => (<HeaderLeft/>),
	   headerRight: (props) => (<HeaderRight/>)
	  }}>

	  <Stack.Screen name="SignIn"
	   component={screens.SignIn}
	   options={{
	    title:'Welcome!',
	    headerRight: () => {},
	    headerLeft: () => {}}}/>

	  <Stack.Screen name="SignUp"
	   component={screens.SignUp}
	   options={{
	    title:'Sign Up',
	    headerRight: () => {},
	    headerLeft: () => {}}}/>

	  <Stack.Screen name="SignOut"
	   component={screens.SignOut}
	   options={{
	    title:'Sign Out',
	    headerRight: () => {}}}/>

	  <Stack.Screen name="Settings"
	   component={screens.Settings}
	   options={{title:'Settings'}}/>

	  <Stack.Screen name="Home"
	   component={screens.Home}
	   options={{title:'Welcome!'}}/>

	  <Stack.Screen name="FormatList"
	   component={screens.FormatList}
	   options={{title:'My Files'}}/>

	  <Stack.Screen name="FormatView"
	   component={screens.FormatView}
	   options={({route}) => ({
	    title:`${bitnook.getFormatName(route.params.form)}`})}/>

	  <Stack.Screen name="FormatCreate"
	   component={screens.FormatCreate}
	   options={{title:'Create New Format'}}/>

	  <Stack.Screen name="FormatUpdate"
	   component={screens.FormatUpdate}
	   options={({route}) => ({
	    title:`Update ${bitnook.getFormatName(route.params.form)} Format`})}/>

	  <Stack.Screen name="FormatDelete"
	   component={screens.FormatDelete}
	   options={({route}) => ({
	    title:`Delete ${bitnook.getFormatName(route.params.form)} Format`})}/>

	  <Stack.Screen name="FileList"
	   component={screens.FileList}
	   options={({route}) => ({
	    title:`My ${bitnook.getFormatName(route.params.form)} Files`})}/>

	  <Stack.Screen name="FileView"
	   component={screens.FileView}
	   options={({route}) => ({
	    title:`${bitnook.getFileName(route.params.form,route.params.file)}`})}/>

	  <Stack.Screen name="FileCreate"
	   component={screens.FileCreate}
	   options={({route}) => ({
	    title:`Create ${bitnook.getFormatName(route.params.form)} File`})}/>

	  <Stack.Screen name="FileUpdate"
	   component={screens.FileUpdate}
	   options={({route}) => ({
	    title:`Update ${bitnook.getFileName(route.params.form,route.params.file)} File`})}/>

	  <Stack.Screen name="FileDelete"
	   component={screens.FileDelete}
	   options={({route}) => ({
	    title:`Delete ${bitnook.getFileName(route.params.form,route.params.file)} File`})}/>

	 </Stack.Navigator>)
}

export default withTheme(RootStack)
