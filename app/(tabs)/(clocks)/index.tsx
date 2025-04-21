import {
	Image,
	StyleSheet,
	Platform,
	ScrollView,
	Pressable,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import HorlogeItem from '@/components/HorlogeItem';
import { Link } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Town } from '@/types/Town';
import { useStore } from '@/hooks/useStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import I18n from '@/i18n';

export default function HomeScreen() {
	const names = useStore((state) => state.names);
	const towns = useStore((state) => state.clocks);
	const setClocks = useStore((state) => state.addClock);
	const deleteTown = useStore((state) => state.removeClock);

	useEffect(() => {
		(async () => {
			const res = await Promise.all(
				names.map((name) =>
					fetch('https://www.timeapi.io/api/Time/current/zone?timeZone=' + name)
				)
			);

			const a = await Promise.all(
				res
					.filter((r) => r.ok)
					.map(async (r) => {
						const town = await r.json();

						const town2: Town = {
							dayTimezone: town.dayOfWeek,
							name: town.timeZone,
							time: new Intl.DateTimeFormat('en-US', {
								hour: '2-digit',
								minute: '2-digit',
								hour12: false,
							}).format(new Date(town.dateTime)),
						};

						return town2;
					})
			);

			setClocks(a);
		})();
	}, [names]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ThemedView style={styles.container}>
					<ThemedView
						style={{
							flexDirection: 'row',
							paddingHorizontal: 16,
							height: 45,
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Pressable>
							<ThemedText style={{ color: 'orange' }}>Modifier</ThemedText>
						</Pressable>
						<Link href="/town">
							<IconSymbol name="plus" size={25} color={'orange'} />
						</Link>
					</ThemedView>

					<ScrollView
						contentInset={{ top: 16, bottom: 64 }}
						showsVerticalScrollIndicator={false}
						style={{ flex: 1, paddingLeft: 16 }}
					>
						<ThemedText type="title" style={{ marginBottom: 16 }}>
							{I18n.t('clocksPage.title')}
						</ThemedText>

						{towns.map((town, index) => (
							<HorlogeItem
								{...town}
								key={town.name}
								onDelete={() => deleteTown(town.name)}
							/>
						))}
					</ScrollView>
				</ThemedView>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
