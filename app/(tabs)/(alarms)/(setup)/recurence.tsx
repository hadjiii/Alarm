import Section from '@/components/Section';
import SectionItem from '@/components/SetionItem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { BackHandler, Pressable } from 'react-native';

const DAYS_OF_WEEK = [
	'lundi',
	'mardi',
	'mercredi',
	'jeudi',
	'vendredi',
	'samedi',
	'dimanche',
];
export default function Page() {
	const navigation = useNavigation();
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const toggleDay = (day: string) => {
		console.log('toggleDay', day);
		if (selectedDays.includes(day)) {
			setSelectedDays(selectedDays.filter((d) => d !== day));
		} else {
			setSelectedDays([...selectedDays, day]);
		}
	};
	const isDaySelected = (day: string) => {
		return selectedDays.includes(day);
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('beforeRemove', (e) => {
			// Prevent default behavior of leaving the screen
			e.preventDefault();

			console.log('BACK CLICKED', e.data.action);

			navigation.dispatch(e.data.action);
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<ThemedText
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				padding: 16,
				borderRadius: 10,
			}}
		>
			<Section>
				{DAYS_OF_WEEK.map((day) => (
					<SectionItem>
						<ThemedView
							key={day}
							style={{
								paddingVertical: 8,
							}}
						>
							<Pressable onPress={() => toggleDay(day)}>
								<ThemedText>Chaque {day}</ThemedText>
							</Pressable>
						</ThemedView>
					</SectionItem>
				))}
			</Section>
		</ThemedText>
	);
}
