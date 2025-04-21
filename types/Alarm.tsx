export type Alarm = {
	id: string;
	isActivated: boolean;
	hour: number;
	minute: number;
	name: string;
	repeat: boolean;
	description: string;
	sound: string;
	recurence: string[];
};
