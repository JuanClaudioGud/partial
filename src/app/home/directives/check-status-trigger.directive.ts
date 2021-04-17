import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckStatusComponent } from '../components';

@Directive({
  selector: '[appCheckStatusTrigger]'
})
export class CheckStatusTriggerDirective {

  constructor(private readonly dialog: MatDialog) { }

  @HostListener('click')
  public onClick(): void {
  	this.dialog.open(CheckStatusComponent, {
  		width: '350px',
  		autoFocus: false,
  	});
  }

}