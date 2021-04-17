import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from '@app/shared/components';
import { MediaService } from '@app/shared/services';
import { Unavailability } from '@app/shared/models';
import { Moment } from 'moment-timezone';

@Component({
  selector: 'app-add-unavailability',
  templateUrl: './add-unavailability.component.html',
  styleUrls: ['./add-unavailability.component.scss']
})
export class AddUnavailabilityComponent extends FormComponent {

  public dateFilter = (date: Moment | null): boolean => {
    if (date) {
      const alreadyExists: boolean = this.checkIfAlreadyExists(date);
      return !alreadyExists;
    }
    return false;
  }

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	public readonly unavailabilities: Unavailability[],
    public readonly mediaService: MediaService,
  	private readonly dialogRef: MatDialogRef<AddUnavailabilityComponent>,
  ) { 
  	super({
      startDate: [
        null, [
          Validators.required,
        ],
      ],
      endDate: [
        null, [
          Validators.required,
        ],
      ],
      reason: [
        null, [ 
          Validators.maxLength(150),
        ],
      ],
    });
  }

  private checkIfAlreadyExists(date: Moment): boolean {
    return this.unavailabilities.some((unavailability: Unavailability): boolean => {
      return unavailability.dates.contains(date);
    });
  }

  public onSubmit(data: any): void {
    this.dialogRef.close(data); 
  }

}