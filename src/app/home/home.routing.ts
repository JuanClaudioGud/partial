import { ModuleWithProviders, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
  HomeLayoutComponent, 
  HomeComponent, 
  ErrorComponent, 
  LoginComponent, 
  ContactComponent 
} from './components';

const HOME_ROUTES: Routes = [
	{
		path: '', 
		component: HomeLayoutComponent,
		children: [
			{
				path: '',
				component: HomeComponent,
			},
      {
        path: 'contact',
        component: ContactComponent,
      },
		],
	},
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

export const HomeRoutingModule: ModuleWithProviders<RouterModule> = (
	RouterModule.forChild(HOME_ROUTES)
);

export const HomeRoutingComponents: Type<any>[] = [
	HomeLayoutComponent,
	HomeComponent,
  ErrorComponent,
  LoginComponent,
  ContactComponent,
];