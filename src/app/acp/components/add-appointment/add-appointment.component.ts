import { Component, OnInit, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeAvailability } from '@ssense/sscheduler';
import { FormComponent } from '@app/shared/components';
import { Appointment, Treatment } from '@app/shared/models';
import { MediaService, SchedulerService } from '@app/shared/services';
import { combineLatest } from 'rxjs';
import { Moment } from 'moment';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent extends FormComponent implements OnInit {

  public slots: Moment[] = [];

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	public readonly treatments: Treatment[],
    public readonly mediaService: MediaService,
    private readonly schedulerService: SchedulerService,
  	private readonly dialogRef: MatDialogRef<AddAppointmentComponent>
  ) { 
    super({
      name: [
        null, [ 
          Validators.required,
          Validators.maxLength(50), 
        ],
      ],
      email: [
        null, [
          Validators.required,
          Validators.maxLength(150),
          Validators.email,
        ],
      ],
      phone: null,
      treatment: [
        null, 
        Validators.required,
      ],
      date: [
        null,
        Validators.required,
      ],
      status: [
        null,
        Validators.required,
      ],
      time: null,
    });
  }

  public ngOnInit(): void {
    combineLatest(
      this.form.controls.treatment.valueChanges, 
      this.form.controls.date.valueChanges
    ).subscribe(([treatment, date]: [Treatment, Moment]): void => {
      this.schedulerService
      .getSlots(date, treatment.duration)
      .subscribe((slots: TimeAvailability[]): void => {
        this.slots = slots
        .filter((slot: TimeAvailability): boolean => slot.available === true)
        .map((slot: TimeAvailability): Moment => moment(slot.time, 'HH:mm'));
      });
    });
  }

  public onSelect(value: Moment): void {
    this.form.controls.date.value.set({ 
      hour: value.get('hour'),
      minute: value.get('minute'), 
    });
  }

  public onSubmit(data: any): void {
    this.dialogRef.close(data); 
  }

}