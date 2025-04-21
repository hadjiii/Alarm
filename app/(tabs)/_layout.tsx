import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute',
					},
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name="(clocks)"
				options={{
					title: 'Horloges',
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="globe" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="(alarms)"
				options={{
					title: 'Alarmes',
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="alarm.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="stopwatch"
				options={{
					title: 'Chronomètre',
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="stopwatch.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="(timers)"
				options={{
					title: 'Minuteurs',
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="timer" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Réglages',
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="gear" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
