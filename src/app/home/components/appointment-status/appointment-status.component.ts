import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from '@app/shared/models';
import { AppointmentStatus } from '@app/shared/enums';
import { AppointmentsService, LoadingService } from '@app/shared/services';
import { APPOINTMENT_CANCEL_SUCCESS_MSG } from '@app/constants';
import { indicate } from '@app/rxjs-operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-appointment-status',
  templateUrl: './appointment-status.component.html',
  styleUrls: ['./appointment-status.component.scss']
})
export class AppointmentStatusComponent implements OnInit {

  AppointmentStatus = AppointmentStatus;

  public readonly loading$: Subject<boolean> = new Subject<boolean>();

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
    public appointment: Appointment,
    private readonly appointmentsService: AppointmentsService,
    private readonly loadingService: LoadingService,
    private readonly snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.loading$.subscribe((isLoading: boolean) => isLoading 
      ? this.loadingService.start() 
      : this.loadingService.stop()
    );
  }

  public onCancel(): void {
  	this.appointmentsService
  	.cancelOne(this.appointment).pipe(
      indicate(this.loading$)
    ).subscribe((appointment: Appointment) => {
  		this.appointment = appointment;
  		this.snackBar.open(APPOINTMENT_CANCEL_SUCCESS_MSG, 'Cerrar');
  	});
  }

}
