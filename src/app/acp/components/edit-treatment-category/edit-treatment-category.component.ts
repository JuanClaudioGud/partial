import { Component, OnInit, Inject } from '@angular/core';
import { Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from '@app/shared/components';
import { TreatmentCategory } from '@app/shared/models';

type DialogData = {
	category: TreatmentCategory,
	categories: TreatmentCategory[],
}

@Component({
  selector: 'app-edit-treatment-category',
  templateUrl: './edit-treatment-category.component.html',
  styleUrls: ['./edit-treatment-category.component.scss']
})
export class EditTreatmentCategoryComponent extends FormComponent implements OnInit {

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	private readonly data: DialogData,
  	private readonly dialogRef: MatDialogRef<EditTreatmentCategoryComponent>,
  ) { 
  	super();
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        this.data.category.name, [
          Validators.maxLength(50),
          this.alreadyExists.bind(this),
        ]
      ],
      description: [
        this.data.category.description, [
          Validators.maxLength(150),
        ],
      ],
      status: [
       this.data.category.status, [ 
          Validators.required
        ],
      ],
    });
  }

  private alreadyExists(control: AbstractControl): { [key: string]: boolean } | null {

    if (this.data.category.name !== control.value) {
      const alreadyExists: boolean = this.checkIfAlreadyExists(control.value);
      return alreadyExists ? { alreadyExists } : null;
    }

    return null;
  }

  private checkIfAlreadyExists(categoryName: string): boolean {
    return this.data.categories.some((category: TreatmentCategory) => {
      return category.name === categoryName;
    });
  }

  public onSubmit(data: any): void {
    this.dialogRef.close({
      ... this.data.category,
      ... data,
    }); 
  }

}