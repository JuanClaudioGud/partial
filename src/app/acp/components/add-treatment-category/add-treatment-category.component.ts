import { Component, OnInit, Inject } from '@angular/core';
import { Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from '@app/shared/components';
import { TreatmentCategory } from '@app/shared/models';

@Component({
  selector: 'app-add-treatment-category',
  templateUrl: './add-treatment-category.component.html',
  styleUrls: ['./add-treatment-category.component.scss']
})
export class AddTreatmentCategoryComponent extends FormComponent implements OnInit {

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	private readonly categories: TreatmentCategory[],
  	private readonly dialogRef: MatDialogRef<AddTreatmentCategoryComponent>,
  ) { 
  	super();
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        null, [
          Validators.maxLength(50),
          this.alreadyExists.bind(this),
        ],
      ],
      description: [
        null, [
          Validators.maxLength(150),
        ],
      ],
      status: [
        null, [ 
          Validators.required
        ],
      ],
    });
  }

  private alreadyExists(control: AbstractControl): { [key: string]: boolean } | null {

    if (control.dirty) {
      const alreadyExists: boolean = this.checkIfAlreadyExists(control.value);
      return alreadyExists ? { alreadyExists } : null;
    }
    
    return null;
  }

  private checkIfAlreadyExists(categoryName: string): boolean {
    return this.categories.some((category: TreatmentCategory) => {
      return category.name === categoryName;
    });
  }

  public onSubmit(data: any): void {
    this.dialogRef.close(data); 
  }

}