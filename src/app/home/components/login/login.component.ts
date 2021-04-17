import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { indicate } from '@app/rxjs-operators';
import { 
  HttpStatusCode, 
  SNACK_BAR_DEFAULT_DISMISS_TEXT, 
  DEFAULT_ERROR_MSG, 
  INVALID_CREDENTIALS_MSG 
} from '@app/constants';
import { AuthCredentials } from '@app/core/interfaces';
import { AuthService, LoadingService } from '@app/shared/services';
import { FormComponent } from '@app/shared/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormComponent implements OnInit {

  public readonly loading$: Subject<boolean> = new Subject<boolean>();

  constructor(
  	private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  	private readonly authService: AuthService,
    private readonly loadingService: LoadingService
  ) { 
  	super({
      email: [
        null, [
          Validators.required,
          Validators.maxLength(150),
          Validators.email,
        ],
      ],
      password: [
        null, [
          Validators.required,
        ],
      ],
    });
  }

  public ngOnInit(): void {
    this.loading$.subscribe((isLoading: boolean): void => isLoading 
    ? this.loadingService.start() 
    : this.loadingService.stop()
    );
  }
  
  public onSubmit(credentials: AuthCredentials): void {
    this.authService.login(credentials).pipe(
      indicate(this.loading$),
      catchError((exception: HttpErrorResponse): typeof EMPTY => {

        const forbiddenOrUnauthorized: boolean = 
        exception.status === HttpStatusCode.FORBIDDEN || 
        exception.status === HttpStatusCode.UNAUTHORIZED;

        const message: string = forbiddenOrUnauthorized
        ? INVALID_CREDENTIALS_MSG 
        : DEFAULT_ERROR_MSG;
        
        this.snackBar.open(message, SNACK_BAR_DEFAULT_DISMISS_TEXT);
        
        return EMPTY;
      })
    ).subscribe((): Promise<boolean> => this.router.navigate(['acp']));
  }

}