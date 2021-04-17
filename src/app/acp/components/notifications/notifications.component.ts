import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '@app/shared/services';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  constructor(
    public readonly mediaService: MediaService,
    public readonly route: ActivatedRoute
  ) { }

}
