import { ColorValue, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';

export default function CircleButton({
	title,
	backgroundColor,
	onPress,
}: {
	backgroundColor?: ColorValue;
	title: string;
	onPress: () => void;
}) {
	return (
		<ThemedView
			style={[
				styles.container,
				{
					backgroundColor: backgroundColor ?? styles.container.backgroundColor,
				},
			]}
		>
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.title}>{title}</Text>
			</TouchableOpacity>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: 'grey',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: 'white',
	},
});
