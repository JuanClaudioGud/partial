import { Injectable, Inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

	private sidenav!: MatSidenav;

  constructor() { }

  public setSidenav(sidenav: MatSidenav): void {
  	this.sidenav = sidenav;
  }

  public toggleSidenav(): void {
  	this.sidenav.toggle();
  }

}