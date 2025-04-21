import React from 'react';
import { StyleSheet, Pressable, ScrollView } from 'react-native';
import AlarmItem from '@/components/AlarmItem';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';
import { useStore } from '@/hooks/useStore';

export default function AlarmsScreen() {
	const alarms = useStore((state) => state.alarms);
	const updateAlarm = useStore((state) => state.updateAlarm);

	return (
		<ScrollView
			contentContainerStyle={{
				flex: 1,
				paddingVertical: 16,
				paddingHorizontal: 8,
			}}
		>
			<ThemedText type="title" style={{ marginBottom: 16 }}>
				Alarmes
			</ThemedText>

			<ThemedView
				style={{
					flexDirection: 'row',
					gap: 4,
					marginTop: 16,
				}}
			>
				<IconSymbol name="bed.double.fill" color="white" size={25} />
				<ThemedText
					style={{
						fontSize: 18,
						fontWeight: '600',
					}}
				>
					Sommeil | Réveil
				</ThemedText>
			</ThemedView>
			<ThemedView
				style={{
					marginTop: 4,
					height: StyleSheet.hairlineWidth,
					backgroundColor: 'grey',
				}}
			/>

			<ThemedView
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingVertical: 16,
				}}
			>
				<ThemedText>Aucune alarme</ThemedText>
				<Pressable
					style={{
						backgroundColor: 'grey',
						borderRadius: 20,
						paddingHorizontal: 8,
						paddingVertical: 4,
					}}
				>
					<ThemedText style={{ fontSize: 16, color: 'orange' }}>
						CONFIGURER
					</ThemedText>
				</Pressable>
			</ThemedView>
			<ThemedView
				style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'grey' }}
			/>

			{alarms.length > 0 && (
				<ThemedView style={{ marginTop: 32, backgroundColor: 'transparent' }}>
					<ThemedText style={{ fontSize: 18, fontWeight: '600' }}>
						Autres
					</ThemedText>

					<ThemedView
						style={{
							height: StyleSheet.hairlineWidth,
							backgroundColor: 'grey',
						}}
					/>
					{alarms.map((alarm) => (
						<Link href="./(setup)" asChild key={alarm.id}>
							<Pressable>
								<AlarmItem
									alarm={alarm}
									toggle={() =>
										updateAlarm({ ...alarm, isActivated: !alarm.isActivated })
									}
								/>
							</Pressable>
						</Link>
					))}
				</ThemedView>
			)}
		</ScrollView>
	);
}
