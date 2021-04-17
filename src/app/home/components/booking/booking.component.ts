import { Component, OnInit, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeAvailability } from '@ssense/sscheduler';
import { AppointmentStatus } from '@app/shared/enums';
import { Appointment, Treatment } from '@app/shared/models';
import { SchedulerService, MediaService } from '@app/shared/services';
import { FormComponent } from '@app/shared/components';
import { combineLatest } from 'rxjs'
import { Moment } from 'moment';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent extends FormComponent implements OnInit {

  public slots: Moment[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public readonly treatments: Treatment[],
    public readonly mediaService: MediaService,
    public readonly dialogRef: MatDialogRef<BookingComponent>,
    private readonly schedulerService: SchedulerService,
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
        null, [
          Validators.required,
        ],
      ],
      date: [
        null, [
          Validators.required,
        ],
      ],
      status: [
        AppointmentStatus.APPROVED, [
          Validators.required,
        ],
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