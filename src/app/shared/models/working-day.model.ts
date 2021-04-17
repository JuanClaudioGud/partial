import { TIMEZONE } from '@app/constants';
import { Resource } from '../interfaces';
import { extendMoment } from 'moment-range';
import { Moment } from 'moment';
import * as moment from 'moment-timezone';

const momentRange = extendMoment(moment);

export class WorkingDay implements Resource {

	constructor(
    public id: number,
		public weekDayId: number,
		public openingHour: Moment,
		public closingHour: Moment,
		public status: boolean
	) { }

	public getDayName(lang: string = 'en'): string {
		moment.locale(lang);
		return moment.weekdays(this.weekDayId);
	}

  public get workingHours(): Moment[] {
  	return Array.from(momentRange.range(
  		this.openingHour, 
  		this.closingHour
  	).by('hour')).map((workingHour: Moment) => (
  		workingHour.tz(TIMEZONE)
  	));
  }
  
}