import React from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Switch, StyleSheet } from 'react-native';
import { Alarm } from '@/types/Alarm';

export default function AlarmItem({
	alarm,
	toggle,
}: {
	alarm: Alarm;
	toggle: () => void;
}) {
	return (
		<>
			<ThemedView style={styles.item}>
				<ThemedView style={styles.infos}>
					<ThemedText style={styles.time}>
						{alarm.hour}:{alarm.minute}
					</ThemedText>
					<Switch value={alarm.isActivated} onChange={() => toggle()} />
				</ThemedView>
				<ThemedText style={styles.label}>{alarm.name}</ThemedText>
			</ThemedView>

			<ThemedView style={styles.separator} />
		</>
	);
}

const styles = StyleSheet.create({
	item: {
		paddingTop: 16,
		paddingBottom: 8,
	},
	infos: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	time: {
		fontSize: 50,
		fontWeight: 200,
		lineHeight: 50,
	},
	label: {
		fontSize: 12,
	},
	separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: 'grey',
	},
});
