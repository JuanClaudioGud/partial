import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Appointment } from '../models';
import { AppointmentAdapter } from '../adapters';
import { ListenerService } from './listener.service';
import { AppointmentStatus, PusherEventType } from '../enums';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService extends ListenerService<Appointment> {

  constructor() { 
  	super(env.api.endpoints.appointments, new AppointmentAdapter(), [
      PusherEventType.APPOINTMENT_CREATE_ONE, 
      PusherEventType.APPOINTMENT_UPDATE_ONE,
    ]);
  }

  public findByEmail(email: string): Observable<Appointment> {

    const endpoint: string = `${ this.resourceEndpoint }/email/${ email }`;

    return this.http.get<Appointment>(endpoint).pipe(
      map((appointment: any): Appointment => {
        return this.resourceAdapter.deserialize(appointment);
      })
    );
  }

  public book(appointment: Appointment): Observable<Appointment> {
    return this.http.post('/book', this.resourceAdapter.serialize(appointment)).pipe(
      map((appointment: any): Appointment => {
        return this.resourceAdapter.deserialize(appointment);
      })
    );
  }

  public cancelOne(appointment: Appointment): Observable<Appointment> {

    const endpoint: string = `${ this.resourceEndpoint }/${ appointment.id }/cancel`;

    return this.http.patch(endpoint, this.resourceAdapter.serialize(appointment)).pipe(
      map((appointment: any): Appointment => {
        return this.resourceAdapter.deserialize(appointment);
      })
    );
  }

  public changeStatus(appointment: Appointment, status: AppointmentStatus): Observable<Appointment> {

    const endpoint: string = `${ this.resourceEndpoint }/${ appointment.id }/status/${ status }`;

    return this.http.patch(endpoint, this.resourceAdapter.serialize(appointment)).pipe(
      map((appointment: any): Appointment => {
        return this.resourceAdapter.deserialize(appointment);
      })
    );
  }

}