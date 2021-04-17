import { FormGroup, FormBuilder } from '@angular/forms';
import { AppInjector } from '@app/injector';

export abstract class FormComponent {

	protected readonly formBuilder: FormBuilder = AppInjector.instance.get(FormBuilder);

	public form!: FormGroup;

  constructor(controls?: {[key: string]: any}) { 
  	if (controls) {
  		this.form = this.formBuilder.group(controls);
  	}
  }

  public get formData(): any {
  	return this.form.value;
  }

}