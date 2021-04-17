import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { environment as env } from '@env/environment';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpStatusCode, SNACK_BAR_DEFAULT_DISMISS_TEXT, DEFAULT_ERROR_MSG } from '@app/constants';
import { AuthService } from '@app/shared/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) { }

  public intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
    	catchError((exception: HttpErrorResponse) => {

        if (exception instanceof HttpErrorResponse) {

          if (exception.error instanceof ErrorEvent) {
            // TODO: ErrorEvent handling
          }

          console.error(exception);

          const loginUrl: string = env.api.url + env.api.endpoints.login;

          const checkStatusUrl: string = env.api.url + env.api.endpoints.appointments + '/email';

          const mailUrl: string = env.api.url + env.api.endpoints.mail;

          if (request.url === loginUrl || request.url.includes(checkStatusUrl) || request.url.includes(mailUrl)) {
            return throwError(exception);
          }

          switch (exception.status) {
            case HttpStatusCode.FORBIDDEN:
            case HttpStatusCode.UNAUTHORIZED: {
              this.dialog.closeAll();
              this.authService.authRedirect();
              break;
            }
            default: {
              this.snackBar.open(DEFAULT_ERROR_MSG, SNACK_BAR_DEFAULT_DISMISS_TEXT);
              break;
            }
          }

          return EMPTY;
        }

    		return throwError(exception);
    	}),
    );
  }
  
}