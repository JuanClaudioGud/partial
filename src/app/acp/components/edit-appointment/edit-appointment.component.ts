import { Component, OnInit, Inject } from '@angular/core';
import { Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeAvailability } from '@ssense/sscheduler';
import { FormComponent } from '@app/shared/components';
import { SchedulerService, MediaService } from '@app/shared/services';
import { AppointmentStatus } from '@app/shared/enums';
import { Appointment, Treatment } from '@app/shared/models';
import { Observable, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Moment } from 'moment';
import * as moment from 'moment';

type DialogData = {
	appointment: Appointment,
	treatments: Treatment[]
}

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent extends FormComponent implements OnInit {

  AppointmentStatus = AppointmentStatus;

  public slots: Moment[] = [];

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	public readonly data: DialogData,
    public readonly mediaService: MediaService,
    private readonly schedulerService: SchedulerService,
  	private readonly dialogRef: MatDialogRef<EditAppointmentComponent>,
  ) { 
    super({
      name: [
        data.appointment.name, [ 
          Validators.required,
          Validators.maxLength(50), 
        ],
      ],
      email: [
        data.appointment.email, [
          Validators.required,
          Validators.maxLength(150),
          Validators.email,
        ],
      ],
      phone: data.appointment.phone,
      treatment: [
        data.appointment.treatment, 
        Validators.required,
      ],
      date: [
        data.appointment.date.clone(),
        Validators.required,
      ],
      status: [
        data.appointment.status,
        Validators.required,
      ],
      time: data.appointment.getFormattedTime(),
    });
  }

  public ngOnInit(): void {
    this.watchControls<Treatment, Moment>(
      this.form.controls.treatment, 
      this.form.controls.date
    ).subscribe(([treatment, date]: [Treatment, Moment]): void => {
      this.schedulerService
      .getSlots(date, treatment.duration)
      .subscribe((slots: TimeAvailability[]): void => {
        this.slots = slots
        .filter((slot: TimeAvailability): boolean => this.checkAvailability(slot, date, treatment.id))
        .map((slot: TimeAvailability): Moment => moment(slot.time, 'HH:mm'));
      });
    });
  }

  private watchControls<T,U>(
  	c1: AbstractControl, 
  	c2: AbstractControl
  ): Observable<[T, U]> {
    return combineLatest(
      c1.valueChanges.pipe(
      	startWith(c1.value)
      ),
      c2.valueChanges.pipe(
      	startWith(c2.value)
      )
    );
  }

  private checkAvailability(slot: TimeAvailability, date: Moment, treatmentId: number): boolean {
    
    const slotTime: Moment = moment(slot.time, 'HH:mm');

    const appointmentTime: Moment = this.data.appointment.getFormattedTime();

    const isSameTime: boolean = appointmentTime.isSame(slotTime);

    const isSameDate: boolean = this.data.appointment.date.isSame(date);

    const isSameTreatment: boolean = this.data.appointment.treatment.id === treatmentId;

    const isAvailable: boolean = slot.available === true;

    const isValid: boolean = isAvailable || isSameTime;

    if (isSameDate && !isSameTreatment) {

      const isAfter: boolean = appointmentTime.isAfter(slotTime);

      return isAfter || isValid;
    }

    return isValid;
  }

  public onSelect(value: Moment): void {
    this.form.controls.date.value.set({ 
      hour: value.get('hour'),
      minute: value.get('minute'), 
    });
  }

  public compareFn(o1: any, o2: any): boolean {
    return o1 instanceof moment ? (o1 as Moment).isSame(o2) : o1.id === o2.id;
  }

  public onSubmit(data: any): void {
    this.dialogRef.close({
      ... this.data.appointment,
      ... data,
    }); 
  }

}