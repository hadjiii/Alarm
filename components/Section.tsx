import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

export default function Section({
	title,
	children,
}: PropsWithChildren & {
	title?: string | undefined;
}) {
	return (
		<>
			{title && <ThemedText style={styles.title}>{title}</ThemedText>}
			<ThemedView style={styles.container}>{children}</ThemedView>
		</>
	);
}

const styles = StyleSheet.create({
	title: {
		marginLeft: 16,
	},
	container: {
		width: '100%',
		alignItems: 'flex-start',
		paddingVertical: 8,
		paddingStart: 16,
		borderRadius: 10,
		backgroundColor: 'grey',
	},
});
