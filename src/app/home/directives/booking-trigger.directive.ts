import { Directive, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { indicate } from '@app/rxjs-operators';
import { Appointment, Treatment } from '@app/shared/models';
import { AppointmentsService, TreatmentsService, LoadingService } from '@app/shared/services';
import { 
  APPOINTMENT_CREATE_SUCCESS_MSG, 
  SERVICE_UNAVAILABLE_MSG, 
  SNACK_BAR_DEFAULT_DISMISS_TEXT 
} from '@app/constants';
import { BookingComponent } from '../components';

@Directive({
  selector: '[appBookingTrigger]'
})
export class BookingTriggerDirective implements OnInit {

	public readonly loading$: Subject<boolean> = new Subject<boolean>();

  constructor(
  	private readonly appointmentsService: AppointmentsService,
  	private readonly treatmentsService: TreatmentsService,
    private readonly loadingService: LoadingService,
  	private readonly snackBar: MatSnackBar,
  	private readonly dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.loading$.subscribe((isLoading: boolean): void => isLoading 
      ? this.loadingService.start() 
      : this.loadingService.stop()
    );
  }

  @HostListener('click')
  public onClick(): void {
    this.getTreatments().pipe(
      indicate(this.loading$)
    ).subscribe((treatments: Treatment[]): void => {
      if (treatments.length > 0) {
        this.openDialog(treatments);
      } else {
        this.snackBar.open(SERVICE_UNAVAILABLE_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
      }
    });
  }

  private getTreatments(): Observable<Treatment[]> {
    return this.treatmentsService.getAll().pipe(
      map((treatments: Treatment[]): Treatment[] => {
        return treatments.filter((treatment: Treatment): boolean => {
          return treatment.category.status === true;
        });
      })
    );
  }

  private openDialog(data: Treatment[]): void {
    this.dialog
    .open(BookingComponent, { 
      data, 
      width: '350px', 
    }).afterClosed().subscribe((appointment: Appointment): void => {
      if (appointment) {
        this.createAppointment(appointment);
      }
    });
  }

  private createAppointment(appointment: Appointment): void {
    this.appointmentsService.book(appointment).pipe(
      indicate(this.loading$)
    ).subscribe((): void => {
      this.snackBar.open(APPOINTMENT_CREATE_SUCCESS_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT)
    });
  }

}