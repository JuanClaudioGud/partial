import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(
  	private readonly zone: NgZone, 
  	private readonly router: Router
  ) { }

  public handleError(exception: Error): void {

    console.error(exception);
    
    this.zone.run((): Promise<boolean> => (
      this.router.navigate(['/error'])
    ));
  }

}