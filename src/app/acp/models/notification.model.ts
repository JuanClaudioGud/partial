import { Resource } from '@app/shared/interfaces';
import { Appointment } from '@app/shared/models'
import { NotificationType } from '../enums';
import { Moment } from 'moment';

export class Notification implements Resource {
	constructor(
    public id: number,
		public payload: Appointment,
		public type: NotificationType,
		public read: boolean,
		public createdAt: Moment,
	) { }
}