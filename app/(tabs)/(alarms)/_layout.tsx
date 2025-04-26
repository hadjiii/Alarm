import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Layout() {
	const safeAreaInsets = useSafeAreaInsets();

	return (
		<Stack screenOptions={{ header: () => null }}>
			<Stack.Screen
				name="index"
				options={{
					header: () => (
						<ThemedView
							style={[styles.header, { marginTop: safeAreaInsets.top }]}
						>
							<Link href="../">
								<ThemedText style={styles.headerBtn}>Modifier</ThemedText>
							</Link>
							<ThemedText style={styles.headerTitle}>Alarme</ThemedText>
							<Link href="./(setup)">
								<IconSymbol name="plus" size={25} color={'orange'} />
							</Link>
						</ThemedView>
					),
				}}
			/>
			<Stack.Screen
				name="(setup)"
				options={{
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
	},
	headerBtn: { color: 'orange', fontSize: 17, fontWeight: 400 },
	headerTitle: { fontSize: 18, fontWeight: 500 },
});
