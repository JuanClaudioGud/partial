import { Component } from '@angular/core';
import { NavigationService } from './core/services';
import { LoadingService } from './shared/services';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [`
    :host {
    	display: block;
      height: 100%;
    }
  `],
})
export class AppComponent {

  constructor(
    private readonly navService: NavigationService,
    private readonly loadingService: LoadingService
  ) { }

  public ngOnInit(): void {
    this.navService.isNavigationPending$
    .subscribe((isPending: boolean): void => (
      isPending 
      ? this.loadingService.start() 
      : this.loadingService.stop()
    ));
  }

}