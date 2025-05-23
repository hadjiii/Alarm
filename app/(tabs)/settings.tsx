import Section from '@/components/Section';
import SectionItem from '@/components/SetionItem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import I18n from '@/i18n';

function switchLanguage(languageCode: string) {
	console.log('Switching language to1:', I18n.locale);
	I18n.locale = languageCode;
	console.log('Switching language to2:', I18n.locale);
}

export default function Settings() {
	const isDarkModeEnabled = useColorScheme() === 'dark';
	const isLightModeEnabled = useColorScheme() === 'light';

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ThemedView style={styles.container}>
				<ThemedText type="title">{I18n.t('settingsPage.title')}</ThemedText>

				<Section>
					<SectionItem>
						<ThemedView style={styles.item}>
							<ThemedText>{I18n.t('settingsPage.themeLabel')}</ThemedText>

							<ThemedView style={styles.actions}>
								<TouchableOpacity onPress={() => switchLanguage('fr')}>
									<ThemedText>Dark</ThemedText>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => switchLanguage('en')}>
									<ThemedText>Light</ThemedText>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => switchLanguage('en')}>
									<ThemedText>System</ThemedText>
								</TouchableOpacity>
							</ThemedView>
						</ThemedView>
					</SectionItem>
				</Section>
				<Section>
					<SectionItem>
						<ThemedView style={styles.item}>
							<ThemedText>{I18n.t('settingsPage.languageLabel')}</ThemedText>
							<ThemedView style={styles.actions}>
								<TouchableOpacity onPress={() => switchLanguage('fr')}>
									<ThemedText>Français</ThemedText>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => switchLanguage('en')}>
									<ThemedText>English</ThemedText>
								</TouchableOpacity>
							</ThemedView>
						</ThemedView>
					</SectionItem>
				</Section>
			</ThemedView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
});
