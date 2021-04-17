import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Treatment } from '@app/shared/models';

@Component({
  selector: 'app-treatment-details',
  templateUrl: './treatment-details.component.html',
  styleUrls: ['./treatment-details.component.scss']
})
export class TreatmentDetailsComponent {

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
    public readonly treatment: Treatment
  ) { }

}
