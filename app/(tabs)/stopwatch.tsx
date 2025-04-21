import CircleButton from '@/components/CircleButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function Stopwatch() {
	const [laps, setLaps] = useState<any>([]);
	const [isRunning, setIsRunning] = useState(false);
	const [totalTime, setTotalTime] = useState('00:00,00');

	const canReset = laps.length > 0 && !isRunning;

	useEffect(() => {
		const interval = setInterval(() => {
			if (isRunning) {
				setTotalTime((prevTime) => {
					const [minutes, seconds] = prevTime.split(':');
					const newSeconds = parseInt(seconds) + 1;
					return `${minutes}:${newSeconds < 10 ? '0' : ''}${newSeconds},00`;
				});

				// update the laps
				const currentLap = laps[0];
				const [minutes, seconds] = currentLap.time.split(':');
				const newSeconds = parseInt(seconds) + 1;
				const currentTime = `${minutes}:${
					newSeconds < 10 ? '0' : ''
				}${newSeconds},00`;
				setLaps([{ ...currentLap, time: currentTime }, ...laps.slice(1)]);
			} else {
				clearInterval(interval);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [isRunning, laps]);

	const handleStartStop = () => {
		if (isRunning) {
			setIsRunning(false);
		} else {
			if (laps.length === 0) {
				const newLap = {
					id: Date.now().toString(),
					name: `Lap ${laps.length + 1}`,
					time: '00:00,00',
				};
				setLaps([newLap]);
			}
			setIsRunning(true);
		}
	};
	const handleReset = () => {
		setTotalTime('00:00,00');
		setLaps([]);
	};
	const startNewLap = () => {
		if (isRunning) {
			const newLap = {
				id: Date.now().toString(),
				name: `Lap ${laps.length + 1}`,
				time: '00:00,00',
			};
			setLaps([newLap, ...laps]);
		}
	};

	return (
		<ThemedView style={{ flex: 1, alignItems: 'center' }}>
			<ThemedText
				style={{
					marginTop: 200,
					marginBottom: 100,
					fontSize: 80,
					fontWeight: '200',
					lineHeight: 80,
				}}
			>
				{totalTime}
			</ThemedText>
			<ThemedView
				style={{
					width: '100%',
					padding: 10,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<CircleButton
					title={canReset ? 'Effacer' : 'Tour'}
					onPress={canReset ? handleReset : startNewLap}
				/>
				<CircleButton
					title={isRunning ? 'Arrêter' : 'Démarrer'}
					backgroundColor="green"
					onPress={handleStartStop}
				/>
			</ThemedView>
			<FlatList
				style={{ flex: 1, width: '100%' }}
				contentContainerStyle={{
					marginHorizontal: 8,
					paddingBottom: 32,
				}}
				data={laps}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ThemedView
						style={{
							width: '100%',
							flexDirection: 'row',
							justifyContent: 'space-between',
							padding: 10,
						}}
					>
						<ThemedText>{item.name}</ThemedText>
						<ThemedText>{item.time}</ThemedText>
					</ThemedView>
				)}
				ItemSeparatorComponent={() => (
					<ThemedView
						style={{
							height: StyleSheet.hairlineWidth,
							width: '100%',
							backgroundColor: '#dadde1',
						}}
					/>
				)}
			/>
		</ThemedView>
	);
}
