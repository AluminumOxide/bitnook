import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { PageContainer, PageButton, BodyText } from '.';

export default function ConfirmView({ question, proceed, nextScreen }) {

	const theme = useTheme()
	const navigation = useNavigation()
	const handleProceed = async function() {
		navigation.navigate(nextScreen, await proceed())
	}
	return (<PageContainer>
		<View style={{justifyContent: 'center'}}>
			<BodyText style={{textAlign: 'center'}}>
				{question}
			</BodyText>
			<View style={{
				justifyContent: 'center',
				flexDirection: 'row',
			}}>
				<PageButton
					icon='check'
					onPress={handleProceed}
					text='Yes'/>
				<PageButton
					icon='cancel'
					onPress={() => navigation.goBack() }
					text='No'/>
			</View>
		</View>
	</PageContainer>)
}
