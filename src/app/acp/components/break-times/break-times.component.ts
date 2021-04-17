import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '@app/shared/services';

@Component({
  selector: 'app-break-times',
  templateUrl: './break-times.component.html',
  styleUrls: ['./break-times.component.scss']
})
export class BreakTimesComponent {

  constructor(
    public readonly mediaService: MediaService,
    public readonly route: ActivatedRoute
  ) { }

}
