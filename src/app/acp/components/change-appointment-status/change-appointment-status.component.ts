import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentStatus } from '@app/shared/enums';

@Component({
  selector: 'app-change-appointment-status',
  templateUrl: './change-appointment-status.component.html',
  styleUrls: ['./change-appointment-status.component.scss']
})
export class ChangeAppointmentStatusComponent {

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	public status: AppointmentStatus
  ) { }

}
