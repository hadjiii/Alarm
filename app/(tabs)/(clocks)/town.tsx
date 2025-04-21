import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TownItem from '@/components/TownItem';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useStore } from '@/hooks/useStore';
import { Town } from '@/types/Town';
import { Link, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	TextInput,
} from 'react-native';

export default function TownScreen() {
	const navigation = useNavigation();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);
	const [filter, setFilter] = useState('');
	const [items, setItems] = useState<string[]>([]);
	const [filtered, setFiltered] = useState<string[]>([]);
	const empty = filter && filter !== '' && filtered.length === 0;

	const addName = useStore((state) => state.addName);

	useEffect(() => {
		if (filter && filter !== '') {
			const filtered = items.filter((town) => town.includes(filter));
			setFiltered(filtered);
		} else {
			setFiltered([]);
		}
	}, [filter]);

	useEffect(() => {
		setError(null);
		setIsLoading(true);
		fetch('https://www.timeapi.io/api/timezone/availabletimezones')
			.then(async (res) => {
				if (!res.ok) {
					throw new Error('An error occurred');
				}

				setItems(await res.json());
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
		<ThemedView style={{ flex: 1 }}>
			<ThemedView style={{ gap: 16, padding: 16 }}>
				<ThemedText style={{ fontSize: 12, textAlign: 'center' }}>
					Choisir une ville
				</ThemedText>
				<ThemedView
					style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
				>
					<ThemedView
						style={{
							flex: 1,
							flexDirection: 'row',
							gap: 4,
							padding: 8,
							backgroundColor: 'grey',
							borderRadius: 10,
						}}
					>
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
				<ThemedView style={{ flex: 1, justifyContent: 'center' }}>
					<ThemedText style={{ alignSelf: 'center' }}>
						Aucun résultat trouvé
					</ThemedText>
				</ThemedView>
			) : (
				<ScrollView
					horizontal={false}
					style={{ flex: 1, paddingHorizontal: 16 }}
				>
					{items.map((town, index) => (
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
