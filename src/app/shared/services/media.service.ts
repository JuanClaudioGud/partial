import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private readonly breakpointObserver: BreakpointObserver) { }

  public isNotLargeScreen(): Observable<boolean> {
    return this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
    ]).pipe(
      map((state: BreakpointState): boolean => state.matches)
    );
  }

  public isSmallScreen(): Observable<boolean> {
    return this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).pipe(
      map((state: BreakpointState): boolean => state.matches)
    );
  }

}
