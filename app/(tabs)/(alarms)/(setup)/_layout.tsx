import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack screenOptions={{ headerBackTitle: 'Retour' }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="recurence" options={{ title: 'Récurrence' }} />
			<Stack.Screen name="ringtone" options={{ title: 'Sonnerie' }} />
		</Stack>
	);
}
