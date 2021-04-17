import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment as env } from '@env/environment';
import { Subject } from 'rxjs';
import { indicate } from '@app/rxjs-operators';

declare var UIkit: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  public readonly loading$: Subject<boolean> =  new Subject<boolean>();

  public readonly form: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(255),
    ]],
    phone: ['', [
      Validators.minLength(7),
      Validators.maxLength(50),
    ]],
    message: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(65000),
    ]],
  });

  public readonly mapOptions: google.maps.MapOptions = {
    center: {
      lat: -32.947587134804316, 
      lng: -60.630444344652155,
    },
    zoom: 4,
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient
  ) { }

  public onClick(): void {
    this.http.post(env.api.endpoints.mail, this.form.value).pipe(
      indicate(this.loading$)  
    ).toPromise()
    .then(() => this.onSuccess())
    .catch(() => this.onError());
  }

  private onSuccess(): void {
    UIkit.notification({
      message: 'Tu solicitud se ha enviado correctamente, te responderemos a la brevedad.',
      status: 'success',
      pos: 'bottom-center',
    });
  }

  private onError(): void {
    UIkit.notification({
      message: 'Ha ocurrido un error al enviar la solicitud, intenta nuevamente más tarde.',
      status: 'danger',
      pos: 'bottom-center',
    });
  }

}
