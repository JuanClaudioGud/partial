// @ts-nocheck
import { Injectable } from '@angular/core';
import { Scheduler, Availability, TimeAvailability } from '@ssense/sscheduler';
import { TIMEZONE } from '@app/constants';
import { LoadingService } from './loading.service';
import { AppointmentsService } from './appointments.service';
import { TreatmentsService } from './treatments.service';
import { WorkingDaysService } from './working-days.service';
import { BreakTimesService } from './break-times.service';
import { UnavailabilitiesService } from './unavailabilities.service';
import { AppointmentStatus } from '../enums';
import { Appointment, Treatment, WorkingDay, BreakTime, Unavailability } from '../models';
import { Observable, Subject, forkJoin, of } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { indicate } from '@app/rxjs-operators';
import { Moment } from 'moment-timezone';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  private readonly loading$: Subject<boolean> = new Subject<boolean>();

  private readonly scheduler: Scheduler = new Scheduler();

  private context: any;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly appointmentsService: AppointmentsService,
    private readonly treatmentsService: TreatmentsService,
    private readonly workingDaysService: WorkingDaysService,
    private readonly breakTimesService: BreakTimesService,
    private readonly unavailabilitiesService: UnavailabilitiesService,
  ) { 
    this.loading$.subscribe((isLoading: boolean) => isLoading 
      ? this.loadingService.start() 
      : this.loadingService.stop()
    );
  }

  private getContext(): Observable<any> {
    return forkJoin(
      this.appointmentsService.getAll(),
      this.treatmentsService.getAll(),
      this.workingDaysService.getAll(),
      this.breakTimesService.getAll(),
      this.unavailabilitiesService.getAll()
    ).pipe(
      map(([
        appointments, 
        treatments,
        workingDays,
        breakTimes,
        unavailabilities,
      ]) => this.context = {
        appointments, 
        treatments,
        workingDays,
        breakTimes,
        unavailabilities,
      }),
    );
  }

  public getSlots(date: Moment, duration: number): Observable<TimeAvailability[]> {
    return this.getContext().pipe(
      indicate(this.loading$),
      map((context: any) => {

        const dateFormat: string = 'YYYY-MM-DD';
        const fromDate: string = date.format(dateFormat);
        const toDate: string = date.clone().add(1, 'd').format(dateFormat);
        const slots: Availability = this.getAvailability(fromDate, toDate, duration);

        return slots[fromDate] || [];
      }),
    );
  }

  private getAvailability(
    startDate: string, 
    endDate: string, 
    duration: number
  ): Availability {

    const data: any = this.getScheduleData();

    return this.scheduler.getAvailability({
      from: startDate,
      to: endDate,
      duration: duration,
      interval: duration,
      timezone: TIMEZONE,
      schedule: data,
    });
  }

  private getScheduleData(): any {

    const allocated: any = this.getAllocations();
    const unavailability: any = this.getUnavailabilities();
    const dailyTimes: any = this.getDailyTimes();

    return Object.assign({
      allocated,
      unavailability,
    }, ... dailyTimes);
  }

  private getAllocations(): any[] {
    return this.context.appointments
    .filter((appointment: Appointment) => {
      return appointment.status !== AppointmentStatus.REJECTED 
      && appointment.status !== AppointmentStatus.CANCELLED 
      && appointment.status !== AppointmentStatus.COMPLETED 
      && appointment.status !== AppointmentStatus.MISSED;
    })
    .map((appointment: Appointment) => {
      return {
        from: appointment.date.format(),
        duration: appointment.treatment.duration,
      };
    });
  }

  private getUnavailabilities(): any[] {
    return this.context.unavailabilities
    .map((unavailability: Unavailability) => {
      return {
        from: unavailability.startDate.format(),
        to: unavailability.endDate.format(),
      };
    });
  }

  private getDailyTimes(): any {
    return this.context.workingDays.map((workingDay: WorkingDay) => {

      const dayName: string = workingDay.getDayName('en').toLowerCase();
      const breakTimes: any = this.getBreakTimes(workingDay.weekDayId);

      return {
        [dayName]: {
          from: workingDay.openingHour,
          to: workingDay.closingHour,
          unavailability: breakTimes,
        }
      };
    });
  }

  private getBreakTimes(dayId: number): any[] {
    return this.context.breakTimes
    .filter((breakTime: BreakTime) => breakTime.workingDay.weekDayId == dayId)
    .map((breakTime: BreakTime) => {
      return {
        from: breakTime.startTime.format('HH:mm'),
        to: breakTime.endTime.format('HH:mm'),
      }
    });
  }

}