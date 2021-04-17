import { Component, OnInit, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from '@app/shared/components';
import { WorkingDay } from '@app/shared/models';
import { TIMEZONE } from '@app/constants';
import { extendMoment, DateRange } from 'moment-range';
import { Moment } from 'moment';
import * as moment from 'moment-timezone';

const momentRange = extendMoment(moment);

@Component({
  selector: 'app-edit-working-day',
  templateUrl: './edit-working-day.component.html',
  styleUrls: ['./edit-working-day.component.scss']
})
export class EditWorkingDayComponent extends FormComponent implements OnInit {

	public dayTimes!: Moment[];

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	public readonly workingDay: WorkingDay,
  	public readonly dialogRef: MatDialogRef<EditWorkingDayComponent>,
  ) { 
  	super({
  		openingHour: [
        workingDay.openingHour, [
          Validators.required,
        ],
      ],
      closingHour: [
        workingDay.closingHour, [
          Validators.required,
        ],
      ],
      status: [
        workingDay.status, [
          Validators.required,
        ],
      ],
  	});
  }

  public ngOnInit(): void {
    this.dayTimes = this.getDayTimes(15);
  }

  private getDayTimes(steps: number): Moment[] {
    const startOfDay: Moment = moment().tz(TIMEZONE).startOf('day');
    const endOfDay: Moment = moment().tz(TIMEZONE).endOf('day');
    const range: DateRange = momentRange.range(startOfDay, endOfDay);
    return Array.from(range.by('minutes', { step: steps }));
  }

  public compareFn(o1: Moment, o2: Moment): boolean {
    return o1.isSame(o2);
  }

  private prepare(data: any): WorkingDay {
    return Object.assign(this.workingDay, {
    	weekDayId: this.workingDay.weekDayId,
      openingHour: data.openingHour,
      closingHour: data.closingHour,
      status: data.status,
    });
  }

  public onSubmit(data: any): void {
    
    const withData: WorkingDay = this.prepare(data);

    this.dialogRef.close(withData); 
  }

}