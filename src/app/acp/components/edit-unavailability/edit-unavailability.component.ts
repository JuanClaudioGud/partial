import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from '@app/shared/components';
import { MediaService } from '@app/shared/services';
import { Unavailability } from '@app/shared/models';
import { Moment } from 'moment-timezone';

type DialogData = {
	unavailability: Unavailability,
	unavailabilities: Unavailability[],
}

@Component({
  selector: 'app-edit-unavailability',
  templateUrl: './edit-unavailability.component.html',
  styleUrls: ['./edit-unavailability.component.scss']
})
export class EditUnavailabilityComponent extends FormComponent {

  public dateFilter = (date: Moment | null): boolean => {
    if (date) {
      const alreadyExists: boolean = this.checkIfAlreadyExists(date);
      const isInRange: boolean = this.isInRange(date);
      return isInRange || !alreadyExists;
    }
    return false;
  }

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	private readonly data: DialogData,
  	private readonly dialogRef: MatDialogRef<EditUnavailabilityComponent>,
    public readonly mediaService: MediaService,
  ) { 
  	super({
      startDate: [
        data.unavailability.startDate, [
          Validators.required,
        ],
      ],
      endDate: [
        data.unavailability.endDate, [
          Validators.required,
        ],
      ],
      reason: [
        data.unavailability.reason, [ 
          Validators.maxLength(150),
        ],
      ],
    });
  }

  private checkIfAlreadyExists(date: Moment): boolean {
    return this.data.unavailabilities.some((unavailability: Unavailability): boolean => {
      return unavailability.dates.contains(date);
    });
  }

  private isInRange(date: Moment): boolean {
    return this.data.unavailability.dates.contains(date);
  }

  public onSubmit(data: any): void {
    this.dialogRef.close({
      ... this.data.unavailability,
      ... data,
    }); 
  }

}