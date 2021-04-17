import { Component, OnInit, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from '@app/shared/components';
import { Treatment, TreatmentCategory } from '@app/shared/models';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrls: ['./add-treatment.component.scss']
})
export class AddTreatmentComponent extends FormComponent implements OnInit {

  public readonly times: number[] = [];

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	public readonly categories: TreatmentCategory[],
  	private readonly dialogRef: MatDialogRef<AddTreatmentComponent>
  ) { 
    super({
      name: [
        null, [ 
          Validators.required,
          Validators.maxLength(50), 
        ],
      ],
      duration: [
        null, [
          Validators.required,
        ],
      ],
      price: [
        null, [
          Validators.required,
        ],
      ],
      category: [
        null, [
          Validators.required,
        ],
      ],
      status: [
        null, [
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

  public onSubmit(data: any): void {
    this.dialogRef.close(data); 
  }

}