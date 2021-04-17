import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/shared/services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) { }

  public intercept(
  	request: HttpRequest<unknown>, 
  	next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

  	const token: string = this.authService.getToken();

  	if (token) {
      
  		const clonedRequest: HttpRequest<unknown> = request.clone({
  			headers: request.headers.set('Authorization', 'Bearer ' + token),
  		});

  		return next.handle(clonedRequest);
  	}

    return next.handle(request);
  }
  
}