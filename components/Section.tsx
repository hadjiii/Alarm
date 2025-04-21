import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { PropsWithChildren } from 'react';

export default function Section({
	title,
	children,
}: PropsWithChildren & {
	title?: string | undefined;
}) {
	return (
		<>
			{title && <ThemedText style={{ marginLeft: 16 }}>{title}</ThemedText>}
			<ThemedView
				style={{
					width: '100%',
					alignItems: 'flex-start',
					paddingVertical: 8,
					paddingStart: 16,
					borderRadius: 10,
					backgroundColor: 'grey',
				}}
			>
				{children}
			</ThemedView>
		</>
	);
}
