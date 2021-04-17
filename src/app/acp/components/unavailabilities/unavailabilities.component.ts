import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '@app/shared/services';

@Component({
  selector: 'app-unavailabilities',
  templateUrl: './unavailabilities.component.html',
  styleUrls: ['./unavailabilities.component.scss']
})
export class UnavailabilitiesComponent {

  constructor(
    public readonly mediaService: MediaService,
    public readonly route: ActivatedRoute
  ) { }

}
