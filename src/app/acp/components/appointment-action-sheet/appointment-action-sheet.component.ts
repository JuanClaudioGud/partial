import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from '@app/shared/models';
import { AppointmentStatus } from '@app/shared/enums';
import { ChangeAppointmentStatusComponent } from '../change-appointment-status';

@Component({
  selector: 'app-appointment-action-sheet',
  templateUrl: './appointment-action-sheet.component.html',
  styleUrls: ['./appointment-action-sheet.component.scss']
})
export class AppointmentActionSheetComponent {

  AppointmentStatus = AppointmentStatus;

  constructor(
  	@Inject(MAT_BOTTOM_SHEET_DATA) 
  	public readonly appointment: Appointment,
    public readonly bottomSheetRef: MatBottomSheetRef,
    private readonly dialog: MatDialog
  ) { }

  public onClick(): void {
    this.dialog.open(ChangeAppointmentStatusComponent, {
      data: this.appointment.status,
    }).afterClosed().subscribe((status: AppointmentStatus) => (
      this.bottomSheetRef.dismiss(status)
    ));
  }

}