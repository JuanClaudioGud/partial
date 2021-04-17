import { Resource } from '../interfaces';
import { extendMoment, DateRange } from 'moment-range';
import { Moment } from 'moment';
import * as moment from 'moment-timezone';

const momentRange = extendMoment(moment);

export class Unavailability implements Resource {

	constructor(
    public id: number,
		public startDate: Moment,
		public endDate: Moment,
		public reason: string
	) { }

	public get dates(): DateRange {
    return momentRange.range(
      this.startDate,
      this.endDate
    );
	}

}