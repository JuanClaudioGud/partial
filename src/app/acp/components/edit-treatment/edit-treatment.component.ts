import { Component, OnInit, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from '@app/shared/components';
import { Treatment, TreatmentCategory } from '@app/shared/models';

type DialogData = {
	treatment: Treatment,
	categories: TreatmentCategory[],
}

@Component({
  selector: 'app-edit-treatment',
  templateUrl: './edit-treatment.component.html',
  styleUrls: ['./edit-treatment.component.scss']
})
export class EditTreatmentComponent extends FormComponent implements OnInit {

	public readonly times: number[] = [];

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	public readonly data: DialogData,
  	private readonly dialogRef: MatDialogRef<EditTreatmentComponent>
  ) { 
    super({
      name: [
        data.treatment.name, [ 
          Validators.required,
          Validators.maxLength(50), 
        ],
      ],
      duration: [
        data.treatment.duration, [
          Validators.required,
        ],
      ],
      price: [
        data.treatment.price, [
          Validators.required,
        ],
      ],
      category: [
        data.treatment.category, [
          Validators.required,
        ],
      ],
      status: [
        data.treatment.status, [
          Validators.required,
        ],
      ],
    });
  }

  public ngOnInit(): void {
    
    const hours: number = 8;
    const steps: number = 15;
    const times: number = hours * (60 / steps);

    for (let i = 0; i < times; i++) {
      this.times.push(steps * i);
    }
  }

  public compareFn(
    o1: TreatmentCategory, 
    o2: TreatmentCategory
  ): boolean {
    return o1.id === o2.id;
  }

  public onSubmit(data: any): void {
    this.dialogRef.close({
      ... this.data.treatment,
      ... data,
    }); 
  }

}