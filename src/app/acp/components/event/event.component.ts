import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {

  constructor(
  	@Inject(MAT_DIALOG_DATA) 
  	public readonly data: any,
  ) { }

}
