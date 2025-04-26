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
		<ScrollView contentContainerStyle={styles.listContentContainer}>
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
				style={[
					styles.separator,
					{
						marginTop: 4,
					},
				]}
			/>

			<ThemedView style={styles.noAlarm}>
				<ThemedText>Aucune alarme</ThemedText>
				<Pressable style={styles.setupBtn}>
					<ThemedText style={styles.setupText}>CONFIGURER</ThemedText>
				</Pressable>
			</ThemedView>
			<ThemedView style={styles.separator} />

			{alarms.length > 0 && (
				<ThemedView style={styles.alarms}>
					<ThemedText style={styles.othersText}>Autres</ThemedText>

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

const styles = StyleSheet.create({
	listContentContainer: {
		flex: 1,
		paddingVertical: 16,
		paddingHorizontal: 8,
	},
	separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: 'grey',
	},
	noAlarm: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 16,
	},
	alarms: { marginTop: 32, backgroundColor: 'transparent' },
	setupBtn: {
		backgroundColor: 'grey',
		borderRadius: 20,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	setupText: { fontSize: 16, color: 'orange' },

	othersText: { marginTop: 32, backgroundColor: 'transparent' },
});
