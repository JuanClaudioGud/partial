import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from '@app/shared/services';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {

  constructor(
    public readonly mediaService: MediaService,
    public readonly route: ActivatedRoute
  ) { }

}