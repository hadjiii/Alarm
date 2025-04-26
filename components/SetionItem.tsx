import { PropsWithChildren } from 'react';
import { ThemedView } from './ThemedView';
import { Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

export default function SectionItem({
	children,
	canNavigate,
	displaySeperator,
}: PropsWithChildren & { canNavigate?: boolean; displaySeperator?: boolean }) {
	return (
		<>
			<ThemedView style={styles.container}>
				<ThemedView style={styles.item}>{children}</ThemedView>
				{canNavigate && (
					<IconSymbol name="chevron.forward" size={20} color="white" />
				)}
			</ThemedView>

			{displaySeperator && <ThemedView style={styles.separator} />}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 8,
		paddingEnd: 24,
		backgroundColor: 'transparent',
	},
	item: {
		backgroundColor: 'transparent',
	},
	separator: {
		height: StyleSheet.hairlineWidth,
		width: '100%',
		backgroundColor: '#dadde1',
	},
});
