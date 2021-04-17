import { Directive, HostListener } from '@angular/core';
import { LayoutService } from '../services';

@Directive({
  selector: '[appSidenavToggle]'
})
export class SidenavToggleDirective {

  constructor(private readonly layoutService: LayoutService) { }

  @HostListener('click')
  public onClick(): void {
  	this.layoutService.toggleSidenav();
  }

}
