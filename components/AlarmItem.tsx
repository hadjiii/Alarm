import React, { PropsWithChildren, useState } from 'react';
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
			<ThemedView
				style={{
					paddingTop: 16,
					paddingBottom: 8,
				}}
			>
				<ThemedView
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<ThemedText
						style={{
							fontSize: 50,
							fontWeight: 200,
							lineHeight: 50,
						}}
					>
						{alarm.hour}:{alarm.minute}
					</ThemedText>
					<Switch value={alarm.isActivated} onChange={() => toggle()} />
				</ThemedView>
				<ThemedText style={{ fontSize: 12 }}>{alarm.name}</ThemedText>
			</ThemedView>

			<ThemedView
				style={{
					height: StyleSheet.hairlineWidth,
					backgroundColor: 'grey',
				}}
			/>
		</>
	);
}
