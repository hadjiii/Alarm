import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link, Stack } from 'expo-router';
import {
	SafeAreaView,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function Layout() {
	const safeAreaInsets = useSafeAreaInsets();

	return (
		<Stack screenOptions={{ header: () => null }}>
			<Stack.Screen
				name="index"
				options={{
					header: () => (
						<ThemedView
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: 16,
								marginTop: safeAreaInsets.top,
							}}
						>
							<Link href="../">
								<ThemedText
									style={{ color: 'orange', fontSize: 17, fontWeight: 400 }}
								>
									Modifier
								</ThemedText>
							</Link>
							<ThemedText style={{ fontSize: 18, fontWeight: 500 }}>
								Alarme
							</ThemedText>
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
