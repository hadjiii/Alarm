import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type Props = { name: string; selectTown: () => void };

export default function TownItem({ name, selectTown }: Props) {
	return (
		<Pressable onPress={selectTown}>
			<ThemedView style={styles.container}>
				<ThemedText>{name}</ThemedText>
				<ThemedView style={styles.separator} />
			</ThemedView>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
		paddingVertical: 8,
	},
	separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: 'grey',
	},
});
