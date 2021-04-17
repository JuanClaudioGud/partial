import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { indicate } from '@app/rxjs-operators';
import { 
  HttpStatusCode, 
  SNACK_BAR_DEFAULT_DISMISS_TEXT, 
  RESERVATION_NOT_FOUND_MSG, 
  DEFAULT_ERROR_MSG 
} from '@app/constants';
import { Appointment } from '@app/shared/models';
import { AppointmentsService, LoadingService } from '@app/shared/services';
import { FormComponent } from '@app/shared/components';
import { AppointmentStatusComponent } from '../appointment-status';

@Component({
  selector: 'app-check-status',
  templateUrl: './check-status.component.html',
  styleUrls: ['./check-status.component.scss']
})
export class CheckStatusComponent extends FormComponent implements OnInit {

	public readonly loading$: Subject<boolean> = new Subject<boolean>();

  constructor(
  	private readonly appointmentsService: AppointmentsService,
  	private readonly loadingService: LoadingService,
  	private readonly snackBar: MatSnackBar,
  	private readonly dialog: MatDialog
  ) { 
  	super({
  		email: [
        null, [
          Validators.required,
          Validators.maxLength(150),
          Validators.email,
        ],
      ],
  	});
  }

  public ngOnInit(): void {
    this.loading$.subscribe((isLoading: boolean): void => isLoading 
    ? this.loadingService.start() 
    : this.loadingService.stop()
    );
  }

  public onSearch(): void {
  	this.appointmentsService
  	.findByEmail(this.form.value.email).pipe(
  		indicate(this.loading$),
  		catchError((exception: HttpErrorResponse): typeof EMPTY => {

  			console.error(exception);

  			const message: string = exception.status === HttpStatusCode.NOT_FOUND 
  			? RESERVATION_NOT_FOUND_MSG
  			: DEFAULT_ERROR_MSG;

  			this.snackBar.open(message, SNACK_BAR_DEFAULT_DISMISS_TEXT);

  			return EMPTY;
  		})
  	).subscribe((data: Appointment): void => {
  		this.dialog.open(AppointmentStatusComponent, { data })
    });
  }

}