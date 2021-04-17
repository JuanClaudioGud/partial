import { Component, OnInit, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from '@app/shared/components';
import { BreakTime, WorkingDay } from '@app/shared/models';
import { Moment } from 'moment';
import * as moment from 'moment';

type DialogData = {
	breakTime: BreakTime,
	breakTimes: BreakTime[],
	workingDays: WorkingDay[],
}

type WorkingHour = { 
  hour: Moment, 
  available: boolean 
};

@Component({
  selector: 'app-edit-break-time',
  templateUrl: './edit-break-time.component.html',
  styleUrls: ['./edit-break-time.component.scss']
})
export class EditBreakTimeComponent extends FormComponent implements OnInit {

  public workingHours!: WorkingHour[];

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	public readonly data: DialogData,
  	public readonly dialogRef: MatDialogRef<EditBreakTimeComponent>,
  ) { 
  	super({
      workingDay: [
        data.breakTime.workingDay, [
          Validators.required,
        ],
      ],
      startTime: [
        data.breakTime.startTime, [
          Validators.required,
        ],
      ],
      endTime: [
        data.breakTime.endTime, [
          Validators.required,
        ],
      ],
      reason: [
        data.breakTime.reason, [ 
          Validators.maxLength(150),
        ],
      ],
    });
  }

  public ngOnInit(): void {
    this.workingHours = this.getWorkingHours(this.form.controls.workingDay.value)
    this.form.controls.workingDay.valueChanges.subscribe((workingDay: WorkingDay): void => {
      this.workingHours = this.getWorkingHours(workingDay);
    });
  }

  private getWorkingHours(workingDay: WorkingDay): WorkingHour[] {
    return workingDay.workingHours.map((hour: Moment): WorkingHour => {
      const available: boolean = this.checkAvailability(hour, workingDay.weekDayId);
      return { hour, available };
    });
  }

  private checkAvailability(hour: Moment, weekDayId: number): boolean {
    return this.isInRange(hour, weekDayId) ? false : this.data.breakTimes
    .some((breakTime: BreakTime): boolean => {
      const contains: boolean = breakTime.hours.contains(hour);
      const isSameWeekDayId: boolean = breakTime.workingDay.weekDayId === weekDayId; 
      return isSameWeekDayId && contains;
    });
  }

  private isInRange(hour: Moment, weekDayId: number): boolean {
    const contains: boolean = this.data.breakTime.hours.contains(hour);
    const isSameWeekDayId: boolean = this.data.breakTime.workingDay.weekDayId === weekDayId;
    return isSameWeekDayId && contains;
  }

  public compareFn(
    o1: Moment | WorkingDay, 
    o2: Moment | WorkingDay
  ): boolean {

    if (o1 instanceof moment) {

      o1 = (o1 as Moment);
      o2 = (o2 as Moment);

      return o1.isSame(o2);

    } else if (o1 instanceof WorkingDay) {

      o1 = (o1 as WorkingDay);
      o2 = (o2 as WorkingDay);

      return o1.id === o2.id;
    }
    return false;
  }

  public onSubmit(data: any): void {
    this.dialogRef.close({
      ... this.data.breakTime,
      ... data,
    }); 
  }

}
