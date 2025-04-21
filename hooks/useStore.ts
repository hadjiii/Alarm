import { Alarm } from '@/types/Alarm';
import { Town } from '@/types/Town';
import { create } from 'zustand';

type State = {
	clocks: Town[];
	names: string[];
	alarms: Alarm[];
	language: 'fr' | 'en';
};

type Action = {
	addClock: (clock: Town[]) => void;
	removeClock: (clock: string) => void;
	addName: (names: string) => void;
	addAlarm: (alarm: Alarm) => void;
	updateAlarm: (alarm: Alarm) => void;
	removeAlarm: (id: string) => void;
	setLanguage: (language: 'fr' | 'en') => void;
};

export const useStore = create<State & Action>((set) => ({
	clocks: [],
	names: ['Europe/Paris'],
	language: 'fr',
	alarms: [],
	addClock: (clocks: Town[]) => set((state) => ({ clocks: [...clocks] })),
	removeClock: (name: string) =>
		set((state) => ({
			clocks: state.clocks.filter((c) => c.name !== name),
		})),
	addName: (name: string) =>
		set((state) => ({
			names: [...state.names, name],
		})),
	addAlarm: (alarm: Alarm) =>
		set((state) => ({ alarms: [...state.alarms, alarm] })),
	updateAlarm: (newAlarm: Alarm) =>
		set((state) => {
			const alarms = state.alarms.map((alarm) => {
				if (alarm.id === newAlarm.id) {
					return { ...alarm, ...newAlarm };
				}
				return alarm;
			});
			return { alarms };
		}),
	removeAlarm: (id: string) =>
		set((state) => ({
			alarms: state.alarms.filter((alarm) => alarm.id !== id),
		})),
	setLanguage: (language: 'fr' | 'en') => set(() => ({ language })),
}));
