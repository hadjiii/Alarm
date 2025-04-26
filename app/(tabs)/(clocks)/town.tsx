import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TownItem from '@/components/TownItem';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useStore } from '@/hooks/useStore';
import { Link, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';

export default function TownScreen() {
	const navigation = useNavigation();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);
	const [filter, setFilter] = useState('');
	const [filtered, setFiltered] = useState<string[]>([]);
	const empty = filter && filter !== '' && filtered.length === 0;

	const setTimezones = useStore((state) => state.setTimezones);
	const addName = useStore((state) => state.addName);

	const timezones = useStore((state) => state.timezones);

	useEffect(() => {
		if (filter && filter !== '') {
			const filtered = timezones?.filter((town) => town.includes(filter)) ?? [];
			setFiltered(filtered);
		} else {
			setFiltered([]);
		}
	}, [filter]);

	useEffect(() => {
		setError(null);
		setIsLoading(true);

		if (timezones) {
			setIsLoading(false);
			return;
		}

		fetch('https://www.timeapi.io/api/timezone/availabletimezones')
			.then(async (res) => {
				if (!res.ok) {
					throw new Error('An error occurred');
				}

				setTimezones(await res.json());
			})
			.catch((err) => setError(err))
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return (
			<ThemedView style={{ flex: 1, justifyContent: 'center' }}>
				<ThemedText style={{ alignSelf: 'center' }}>Chargement...</ThemedText>
			</ThemedView>
		);
	}

	if (error) {
		return (
			<ThemedView style={{ flex: 1, justifyContent: 'center' }}>
				<ThemedText style={{ alignSelf: 'center' }}>{error}</ThemedText>
			</ThemedView>
		);
	}

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.header}>
				<ThemedText style={styles.headerTitle}>Choisir une ville</ThemedText>
				<ThemedView style={styles.searchBar}>
					<ThemedView style={styles.searchBarContainer}>
						<IconSymbol name="magnifyingglass" size={20} color="lightgrey" />
						<TextInput
							placeholder="Recherche"
							style={{ flex: 1 }}
							value={filter}
							onChangeText={setFilter}
						/>

						{filter && filter !== '' ? (
							<Pressable onPress={() => setFilter('')}>
								<IconSymbol
									name="xmark.circle.fill"
									size={20}
									color="lightgrey"
								/>
							</Pressable>
						) : (
							<Pressable>
								<IconSymbol name="mic.fill" size={20} color="lightgrey" />
							</Pressable>
						)}
					</ThemedView>
					<Link href="../" style={{ color: 'orange' }}>
						Annuler
					</Link>
				</ThemedView>
			</ThemedView>

			{/* <KeyboardAvoidingView> */}
			{empty ? (
				<ThemedView style={styles.emptyContainer}>
					<ThemedText style={styles.emptyText}>
						Aucun résultat trouvé
					</ThemedText>
				</ThemedView>
			) : (
				<ScrollView horizontal={false} style={styles.list}>
					{timezones?.map((town, index) => (
						<TownItem
							name={town.replace('/', ' ')}
							key={index}
							selectTown={() => {
								console.log('SELECTED ===>', town);
								addName(town);
								navigation.goBack();
							}}
						/>
					))}
				</ScrollView>
			)}
			{/* </KeyboardAvoidingView> */}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	header: { gap: 16, padding: 16 },
	headerTitle: { fontSize: 12, textAlign: 'center' },
	searchBar: { flexDirection: 'row', alignItems: 'center', gap: 8 },
	searchBarContainer: {
		flex: 1,
		flexDirection: 'row',
		gap: 4,
		padding: 8,
		backgroundColor: 'grey',
		borderRadius: 10,
	},
	emptyContainer: { flex: 1, justifyContent: 'center' },
	emptyText: { alignSelf: 'center' },
	list: { flex: 1, paddingHorizontal: 16 },
});
