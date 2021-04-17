import { NgModule, DoBootstrap, Injector, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core';
import { HomeModule } from './home';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AppInjector } from './injector';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    AppRoutingModule,
  ],
})
export class AppModule implements DoBootstrap { 

  constructor(private readonly injectorRef: Injector) { }

  public ngDoBootstrap(appRef: ApplicationRef): void {
    AppInjector.instance = this.injectorRef;
    appRef.bootstrap(AppComponent);
  }

}