import { Component, OnInit, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from '@app/shared/components';
import { BreakTime, WorkingDay } from '@app/shared/models';
import { Moment } from 'moment';

type DialogData = {
	breakTimes: BreakTime[],
	workingDays: WorkingDay[],
}

type WorkingHour = { 
  hour: Moment, 
  available: boolean 
};

@Component({
  selector: 'app-add-break-time',
  templateUrl: './add-break-time.component.html',
  styleUrls: ['./add-break-time.component.scss']
})
export class AddBreakTimeComponent extends FormComponent implements OnInit {

  public workingHours!: WorkingHour[];

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	public readonly data: DialogData,
  	public readonly dialogRef: MatDialogRef<AddBreakTimeComponent>,
  ) { 
  	super({
      workingDay: [
        null, [
          Validators.required,
        ],
      ],
      startTime: [
        null, [
          Validators.required,
        ],
      ],
      endTime: [
        null, [
          Validators.required,
        ],
      ],
      reason: [
        null, [ 
          Validators.maxLength(150),
        ],
      ],
    });
  }

  public ngOnInit(): void {
    this.form.controls.workingDay.valueChanges.subscribe((workingDay: WorkingDay): void => {
      this.workingHours = workingDay.workingHours.map((hour: Moment): WorkingHour => {
        const available: boolean = this.checkAvailability(hour, workingDay.weekDayId);
        return { hour, available };
      });
    });
  }

  private checkAvailability(hour: Moment, weekDayId: number): boolean {
    return this.data.breakTimes.some((breakTime: BreakTime): boolean => {
      const contains: boolean = breakTime.hours.contains(hour);
      const isSameWeekDayId: boolean = breakTime.workingDay.weekDayId === weekDayId;
      return isSameWeekDayId && contains;
    });
  }

  public onSubmit(data: any): void {
    this.dialogRef.close(data); 
  }

}