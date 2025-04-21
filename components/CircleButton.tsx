import { ColorValue, Text, TouchableOpacity } from 'react-native';
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
			style={{
				width: 80,
				height: 80,
				borderRadius: 40,
				backgroundColor: backgroundColor ?? 'grey',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<TouchableOpacity onPress={onPress}>
				<Text style={{ color: 'white' }}>{title}</Text>
			</TouchableOpacity>
		</ThemedView>
	);
}
