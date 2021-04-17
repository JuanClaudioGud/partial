import { PusherEventType } from '../enums';

export interface PusherEvent {
	eventType: string;
	payload: any;
}