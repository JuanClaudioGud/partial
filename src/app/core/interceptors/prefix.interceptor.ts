import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { environment as env } from '@env/environment'; 
import { Observable } from 'rxjs';

@Injectable()
export class PrefixInterceptor implements HttpInterceptor {

  constructor() { }

  public intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const preffixedRequest: HttpRequest<unknown> = this.setPreffix(request);

    return next.handle(preffixedRequest);
  }

  private setPreffix(request: HttpRequest<unknown>): HttpRequest<unknown> {
  	return request.clone({ url: env.api.url + request.url, });
  }

}