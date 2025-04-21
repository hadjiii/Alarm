import Section from '@/components/Section';
import SectionItem from '@/components/SetionItem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStore } from '@/hooks/useStore';
import { Alarm } from '@/types/Alarm';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Link, Stack, useNavigation } from 'expo-router';
import { useState } from 'react';
import {
	Pressable,
	Switch,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native';
import * as Notifications from 'expo-notifications';

export default function SetupAlarmScreen() {
	const navigation = useNavigation();
	const addAlarm = useStore((state) => state.addAlarm);
	const [alarm, setAlarm] = useState<Alarm>({
		id: 'alarm' + Date.now(),
		isActivated: true,
		hour: new Date().getHours(),
		minute: new Date().getMinutes(),
		name: 'Alarme',
		repeat: true,
		description: '',
		sound: '',
		recurence: [],
	});

	return (
		<>
			<Stack.Screen
				options={{
					header: () => (
						<ThemedView
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: 16,
							}}
						>
							<Link dismissTo href="../">
								<ThemedText
									style={{ color: 'orange', fontSize: 17, fontWeight: 400 }}
								>
									Annuler
								</ThemedText>
							</Link>
							<ThemedText style={{ fontSize: 18, fontWeight: 500 }}>
								Alarme
							</ThemedText>
							<Pressable
								onPress={() => {
									addAlarm(alarm);
									Notifications.scheduleNotificationAsync({
										content: {
											title: alarm.name,
											body: "C'est l'heure de se réveiller !",
											sound: true,
										},
										trigger: {
											hour: alarm.hour,
											minute: alarm.minute,
											type: 'calendar',
											repeats: alarm.repeat,
										},
									});
									navigation.goBack();
								}}
							>
								<ThemedText
									style={{ color: 'orange', fontSize: 17, fontWeight: 400 }}
								>
									Enregistrer
								</ThemedText>
							</Pressable>
						</ThemedView>
					),
				}}
			/>
			<ThemedView style={{ flex: 1, padding: 16, gap: 32 }}>
				<RNDateTimePicker
					mode="time"
					display="spinner"
					value={
						new Date(new Date().getFullYear(), 0, 0, alarm.hour, alarm.minute)
					}
					onChange={(_, date) => {
						if (date) {
							setAlarm((prev) => ({
								...prev,
								hour: date.getHours(),
								minute: date.getMinutes(),
							}));
						}
					}}
				/>

				<Section>
					<SectionItem displaySeperator={true} canNavigate={true}>
						<Link href="./recurence" asChild>
							<TouchableHighlight>
								<ThemedView
									style={{
										width: '100%',
										flexDirection: 'row',
										justifyContent: 'space-between',
										backgroundColor: 'transparent',
									}}
								>
									<ThemedText>Récurrence</ThemedText>
									<ThemedText>Jamais</ThemedText>
								</ThemedView>
							</TouchableHighlight>
						</Link>
					</SectionItem>
					<SectionItem displaySeperator={true}>
						<ThemedView
							style={{
								width: '100%',
								flexDirection: 'row',
								justifyContent: 'space-between',
								backgroundColor: 'transparent',
							}}
						>
							<ThemedText>Description</ThemedText>
							<ThemedView style={{ backgroundColor: 'transparent' }}>
								<TextInput
									style={{ color: 'white' }}
									value={alarm.name}
									onChangeText={(name) => setAlarm({ ...alarm, name })}
								/>
							</ThemedView>
						</ThemedView>
					</SectionItem>
					<SectionItem displaySeperator={true} canNavigate={true}>
						<Link href="./ringtone">
							<ThemedView
								style={{
									width: '100%',
									flexDirection: 'row',
									justifyContent: 'space-between',
									backgroundColor: 'transparent',
								}}
							>
								<ThemedText>Sonnerie</ThemedText>
								<ThemedText>Alarme</ThemedText>
							</ThemedView>
						</Link>
					</SectionItem>
					<SectionItem>
						<ThemedView
							style={{
								width: '100%',
								flexDirection: 'row',
								justifyContent: 'space-between',
								backgroundColor: 'transparent',
							}}
						>
							<ThemedText>Rappel d'alarme</ThemedText>
							<Switch
								value={alarm.repeat}
								onValueChange={(repeat) => setAlarm({ ...alarm, repeat })}
							/>
						</ThemedView>
					</SectionItem>
				</Section>

				<TouchableOpacity
					style={{
						width: '100%',
						alignItems: 'center',
						borderRadius: 10,
						padding: 10,
						marginTop: 32,
						backgroundColor: 'grey',
					}}
				>
					<Text style={{ color: '#EE204D' }}>Supprimer l'alarme</Text>
				</TouchableOpacity>
			</ThemedView>
		</>
	);
}
