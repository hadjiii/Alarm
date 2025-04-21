import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type Props = { name: string; selectTown: () => void };

export default function TownItem({ name, selectTown }: Props) {
	return (
		<Pressable onPress={selectTown}>
			<ThemedView style={{ gap: 8, paddingVertical: 8 }}>
				<ThemedText>{name}</ThemedText>
				<ThemedView
					style={{
						height: StyleSheet.hairlineWidth,
						backgroundColor: 'grey',
					}}
				/>
			</ThemedView>
		</Pressable>
	);
}
