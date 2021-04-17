import { Resource } from '../interfaces';
import { WorkingDay } from './working-day.model';
import { extendMoment, DateRange } from 'moment-range';
import { Moment } from 'moment';
import * as moment from 'moment-timezone';

const momentRange = extendMoment(moment);

export class BreakTime implements Resource {

	constructor(
    public id: number,
		public workingDay: WorkingDay,
		public startTime: Moment,
		public endTime: Moment,
		public reason: string
	) { }

	public get hours(): DateRange {
		return momentRange.range(
			this.startTime,
			this.endTime
		);
	}
	
}