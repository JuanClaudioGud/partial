import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '@app/shared/services';

@Component({
  selector: 'app-treatment-categories',
  templateUrl: './treatment-categories.component.html',
  styleUrls: ['./treatment-categories.component.scss']
})
export class TreatmentCategoriesComponent {

  constructor(
    public readonly mediaService: MediaService,
    public readonly route: ActivatedRoute
  ) { }

}