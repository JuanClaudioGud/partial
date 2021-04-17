import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';

@Injectable()
export class DateFormatterService extends CalendarDateFormatter {

	public isSmallScreen!: boolean;

	public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
		const format: string = this.isSmallScreen ? 'EEE' : 'EEEE';
    return new DatePipe(locale!).transform(date!, format!, locale!)!;
  }

  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
  	const format: string = this.isSmallScreen ? 'EEEEE' : 'EEEE';
    return new DatePipe(locale!).transform(date!, format!, locale!)!;
  }

  public weekViewColumnSubHeader({ date, locale }: DateFormatterParams): string {
  	const format: string = this.isSmallScreen ? 'd' : 'MMM d';
    return new DatePipe(locale!).transform(date!, format!, locale!)!;
  }

}
