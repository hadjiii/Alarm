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
			<ThemedView
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingVertical: 8,
					paddingEnd: 24,
					backgroundColor: 'transparent',
				}}
			>
				<ThemedView style={{ backgroundColor: 'transparent' }}>
					{children}
				</ThemedView>
				{canNavigate && (
					<IconSymbol name="chevron.forward" size={20} color="white" />
				)}
			</ThemedView>

			{displaySeperator && (
				<ThemedView
					style={{
						height: StyleSheet.hairlineWidth,
						width: '100%',
						backgroundColor: '#dadde1',
					}}
				/>
			)}
		</>
	);
}
