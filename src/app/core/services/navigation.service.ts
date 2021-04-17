import { Injectable } from '@angular/core';
import { 
	Router, 
	RouterEvent, 
	NavigationStart, 
	NavigationEnd, 
	NavigationCancel, 
	NavigationError 
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public readonly isNavigationPending$: Observable<boolean> = this.router.events.pipe(
    filter((event: any) => this.isConsideredEvent(event)),
    map((event: any) => this.isNavigationStart(event)),
    distinctUntilChanged()
  );

  constructor(private readonly router: Router) { }

  private isConsideredEvent(event: any): boolean {
    return this.isNavigationStart(event) 
    || this.isNavigationEnd(event);
  }

  private isNavigationStart(event: any): boolean {
    return event instanceof NavigationStart;
  }

  private isNavigationEnd(event: any): boolean {
    return event instanceof NavigationEnd 
    || event instanceof NavigationCancel 
    || event instanceof NavigationError;
  }

}