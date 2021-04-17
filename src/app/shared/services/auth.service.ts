import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment as env } from '@env/environment';
import { TOKEN_NAME } from '@app/constants';
import { AuthCredentials } from '@app/core/interfaces';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  public authRedirect(): void {

    if (this.isLoggedIn) {
      this.logout();
    }

    this.router.navigate(['/login']);
  }

  public get isLoggedIn(): boolean {

    const token: string = this.getToken();

    return Boolean(token);
  }

  public login(credentials: AuthCredentials): Observable<any> {
  	return this.http.post(env.api.endpoints.login, credentials).pipe(
  		tap((response: any): void => this.setToken(response.access_token)),
  	);
  }

  public logout(): void {
  	localStorage.removeItem(TOKEN_NAME);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_NAME)!;
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }


  private decodeToken(): any {

    const token: string = localStorage.getItem(TOKEN_NAME)!; 

    const decodedToken: string = atob(token.split('.')[1]);

    return JSON.parse(decodedToken);
  }

  public getTokenExpirationDate(token: string): Date | null {

    const decoded = this.decodeToken();

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0); 

    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(): boolean {

    const token: string = this.getToken();

    if (!token) {
      return true;
    }

    const expirationDate = this.getTokenExpirationDate(token);

    if(expirationDate === undefined) {
      return false;
    }

    const expired: boolean = new Date().valueOf() > expirationDate!.valueOf();

    return expired;
  }

}