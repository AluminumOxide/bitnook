import { BitnookProvider, ThemeProvider, FormProvider } from '../contexts/'
import RootStack from './layout'
import ThemeStack from './theme'

export default function App() {
	return(<BitnookProvider>
		<FormProvider>
			<ThemeProvider>
				<ThemeStack>
						<RootStack/>

				</ThemeStack>
			</ThemeProvider>
		</FormProvider>
	</BitnookProvider>)
}

