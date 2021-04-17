import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '@app/shared/models';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent {

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
    public readonly appointment: Appointment
  ) { }

}
