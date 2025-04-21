import { Dimensions, Pressable, StyleSheet, TextStyle } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Town } from '@/types/Town';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD_1 = -width * 0.3;
const SWIPE_THRESHOLD_2 = -width * 0.6;

export default function HorlogeItem({
	name,
	dayTimezone,
	time,
	onDelete,
}: Town & { onDelete: () => void }) {
	const offset = useSharedValue<number>(0);
	const deleteBtnTextAlign = useSharedValue<TextStyle['textAlign']>('right');

	const panGesture = Gesture.Pan()
		.onChange((event) => {
			offset.value = event.translationX;
			if (offset.value < SWIPE_THRESHOLD_2) {
				deleteBtnTextAlign.value = 'left';
			}
		})
		.onFinalize((event) => {
			if (offset.value < SWIPE_THRESHOLD_2) {
				offset.value = withTiming(-width, {}, runOnJS(onDelete));
			} else if (offset.value < SWIPE_THRESHOLD_1) {
				offset.value = withTiming(SWIPE_THRESHOLD_1);
			} else {
				offset.value = withTiming(0);
			}
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: offset.value }],
	}));

	const animatedStyle2 = useAnimatedStyle(() => ({
		textAlign: deleteBtnTextAlign.value,
	}));

	return (
		<ThemedView>
			<ThemedView
				style={{
					position: 'absolute',
					right: 0,
					height: '100%',
					width: '100%',
					justifyContent: 'center',
					backgroundColor: '#FF474D',
					paddingRight: 8,
				}}
			>
				<Pressable onPress={onDelete}>
					<ThemedText>
						<Animated.Text style={[{ fontSize: 20 }, animatedStyle2]}>
							Supprimer
						</Animated.Text>
					</ThemedText>
				</Pressable>
			</ThemedView>

			<GestureDetector gesture={panGesture}>
				<Animated.View style={[animatedStyle]}>
					<ThemedView style={{ flex: 1, gap: 16, paddingTop: 8 }}>
						<ThemedView
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<ThemedView style={{ flex: 1, gap: 4 }}>
								<ThemedText type="default">{dayTimezone}</ThemedText>
								<ThemedText type="subtitle">{name}</ThemedText>
							</ThemedView>
							<ThemedText
								style={{
									fontWeight: 200,
									fontSize: 60,
									lineHeight: 60,
									paddingRight: 16,
								}}
							>
								{time}
							</ThemedText>
						</ThemedView>
						<ThemedView
							style={{
								height: StyleSheet.hairlineWidth,
								backgroundColor: 'grey',
							}}
						/>
					</ThemedView>
				</Animated.View>
			</GestureDetector>
		</ThemedView>
	);
}
