import Section from '@/components/Section';
import SectionItem from '@/components/SetionItem';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { Pressable, ScrollView } from 'react-native';

const DAYS_OF_WEEK = [
	'lundi',
	'mardi',
	'mercredi',
	'jeudi',
	'vendredi',
	'samedi',
	'dimanche',
];

const RINGTONES = [
	'Radial',
	'Ringtone 1',
	'Ringtone 2',
	'Ringtone 3',
	'Ringtone 4',
	'Ringtone 5',
	'Ringtone 6',
	'Ringtone 7',
	'Ringtone 8',
	'Ringtone 9',
	'Ringtone 10',
	'Ringtone 11',
	'Ringtone 12',
	'Ringtone 13',
	'Ringtone 14',
	'Ringtone 15',
];
export default function Page() {
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

	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: 'center',
				padding: 16,
				gap: 16,
			}}
		>
			<Section>
				<SectionItem>
					<Pressable onPress={() => toggleDay('day')}>
						<ThemedText>Vibration</ThemedText>
					</Pressable>
				</SectionItem>
			</Section>

			<Section title="STORE">
				<SectionItem>
					<Pressable onPress={() => toggleDay('day')}>
						<ThemedText>Sonneries</ThemedText>
					</Pressable>
				</SectionItem>
			</Section>

			<Section title="MORCEAUX">
				<SectionItem>
					<Pressable onPress={() => toggleDay('day')}>
						<ThemedText>Choisir un morceau</ThemedText>
					</Pressable>
				</SectionItem>
			</Section>

			<Section title="SONNERIES">
				{RINGTONES.map((ringtone, index) => (
					<SectionItem
						key={ringtone}
						displaySeperator={
							RINGTONES.length > 1 && index !== RINGTONES.length - 1
						}
					>
						<Pressable onPress={() => toggleDay('day')}>
							<ThemedText>{ringtone}</ThemedText>
						</Pressable>
					</SectionItem>
				))}
			</Section>

			<Section>
				<SectionItem>
					<Pressable onPress={() => toggleDay('day')}>
						<Pressable onPress={() => toggleDay('day')}>
							<ThemedText>Aucun</ThemedText>
						</Pressable>
					</Pressable>
				</SectionItem>
			</Section>
		</ScrollView>
	);
}
