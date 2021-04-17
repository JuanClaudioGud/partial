import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

	@Output() 
	public readonly search: EventEmitter<void> = new EventEmitter<void>();

	@Output() 
	public readonly add: EventEmitter<void> = new EventEmitter<void>();

	@Input() 
	public searchIcon: boolean = true;

	@Input() 
	public addIcon: boolean = true; 

	@Input() 
	public background: string = '';

	@Input() 
	public title: string = '';

	constructor() { }

}