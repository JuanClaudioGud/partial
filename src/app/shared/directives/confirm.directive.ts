import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../components';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appConfirm]'
})
export class ConfirmDirective {

  @Output() 
  public readonly confirm: EventEmitter<void> = new EventEmitter<void>();

  @Output() 
  public readonly cancel: EventEmitter<void> = new EventEmitter<void>();

	constructor(private readonly dialog: MatDialog) { }

  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
  	event.stopPropagation();
  	this.confirmRequest()
    .subscribe((confirmed: boolean): void => confirmed 
      ? this.confirm.emit() 
      : this.cancel.emit()
  	);
  }

  private confirmRequest(): Observable<boolean> {
    return this.dialog.open(ConfirmComponent, { 
      minWidth: '35vw',
    }).afterClosed();
  }

}