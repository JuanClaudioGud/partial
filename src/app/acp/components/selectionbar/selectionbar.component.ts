import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selectionbar',
  templateUrl: './selectionbar.component.html',
  styleUrls: ['./selectionbar.component.scss']
})
export class SelectionbarComponent {

	@Output() 
	public readonly cancel: EventEmitter<void> = new EventEmitter<void>();

	@Output() 
	public readonly view: EventEmitter<void> = new EventEmitter<void>();

	@Output() 
	public readonly edit: EventEmitter<void> = new EventEmitter<void>();

	@Output() 
	public readonly delete: EventEmitter<void> = new EventEmitter<void>();

	@Input() 
	public viewIcon: boolean = true;

	@Input() 
	public editIcon: boolean = true;

	@Input() 
	public deleteIcon: boolean = true;

	@Input() 
	public background: string = '';

	@Input() 
	public count: number = 0;

	@Input() 
	public hideCount: boolean = false;

  constructor() { }

}