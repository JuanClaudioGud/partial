import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { NavLink } from '@app/shared/interfaces';
import { MediaService, AuthService } from '@app/shared/services';
import { LayoutService } from '../../services';

@Component({
  selector: 'app-acp-layout',
  templateUrl: './acp-layout.component.html',
  styleUrls: ['./acp-layout.component.scss'],
})
export class AcpLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav) 
  public readonly sidenav!: MatSidenav;

  public readonly links: ReadonlyArray<NavLink> =  [
    {
      path: '/acp/notifications',
      label: 'Notifications',
      icon: 'notifications',
    },
    {
      path: '/acp/calendar',
      label: 'Calendar',
      icon: 'date_range',
    },
    {
      path: '/acp/appointments',
      label: 'Appointments',
      icon: 'event',
    },
    {
      path: '/acp/treatments',
      label: 'Treatments',
      icon: 'miscellaneous_services',
    },
    {
      path: '/acp/categories',
      label: 'Categories',
      icon: 'category',
    },
    {
      path: '/acp/working-days',
      label: 'Working days',
      icon: 'event_available',
    },
    {
      path: '/acp/break',
      label: 'Break times',
      icon: 'schedule',
    },
    {
      path: '/acp/unavailabilities',
      label: 'Unavailabilities',
      icon: 'event_busy',
    },
  ];

  public isNotLargeScreen!: boolean;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly mediaService: MediaService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.mediaService
    .isNotLargeScreen()
    .subscribe((result: boolean) => (
      this.isNotLargeScreen = result
    ));
  }

  public ngAfterViewInit(): void {
    this.layoutService.setSidenav(this.sidenav);
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}