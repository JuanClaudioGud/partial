import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TreatmentCategory } from '@app/shared/models';

@Component({
  selector: 'app-treatment-category-details',
  templateUrl: './treatment-category-details.component.html',
  styleUrls: ['./treatment-category-details.component.scss']
})
export class TreatmentCategoryDetailsComponent {

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
    public readonly category: TreatmentCategory
  ) { }

}