import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CalendarView, CalendarEvent, CalendarDateFormatter, MOMENT } from 'angular-calendar';
import { TIMEZONE } from '@app/constants';
import { Appointment, Treatment } from '@app/shared/models';
import { MediaService } from '@app/shared/services';
import { DateFormatterService } from '../../services';
import { EventComponent } from '../event';
import { Moment } from 'moment';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: DateFormatterService,
    },
    {
      provide: DateFormatterService,
      useExisting: CalendarDateFormatter,
    },
    {
      provide: MOMENT,
      useValue: moment,
    },
  ],
})
export class CalendarComponent implements OnInit {

	CalendarView = CalendarView;

	public view: CalendarView = CalendarView.Month;

	public viewDate: Date = new Date();

	public events!: CalendarEvent[];

  public isSmallScreen!: boolean;

  constructor(
    private readonly mediaService: MediaService,
    private readonly dateFormatterService: DateFormatterService,
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.createEvents();
    this.watchScreen();
  }

  private createEvents(): void {
    const localOffset: number = new Date().getTimezoneOffset();
    this.events = this.route.snapshot.data.appointments
    .map((appointment: Appointment) => {
      return {
        start: appointment.date.clone().utcOffset(-localOffset, true).toDate(),
        end: appointment.date.clone().add(appointment.treatment.duration, 'minutes').utcOffset(-localOffset, true).toDate(),
        title: `${ appointment.name } - ${ appointment.treatment.name }`,
        data: appointment,
      };
    });
  }

  private watchScreen(): void {
    this.mediaService
    .isSmallScreen()
    .subscribe((result: boolean): void => {
      this.isSmallScreen = result;
      this.dateFormatterService.isSmallScreen = result;
      this.viewDate = new Date(this.viewDate);
    });
  }

  private getTreatment(treatmentId: number): Treatment {
    return this.route.snapshot.data.treatments.find((treatment: Treatment): boolean => {
      return treatment.id === treatmentId;
    });
  }

  public onEventClick(event: any): void {
    this.dialog.open(EventComponent, {
      data: {
        appointment: event.data,
        treatments: this.route.snapshot.data.treatments,
      },
    });
  }

}