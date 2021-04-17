import { 
	Directive, 
	AfterViewInit, 
	ElementRef, 
	ChangeDetectorRef 
} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(
  	private readonly elementRef: ElementRef,
  	private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
  	this.elementRef.nativeElement.focus();
  	this.changeDetectorRef.detectChanges();
  }

}