import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { StatusPipe, AmTimeAgoPipe, DurationPipe } from './pipes';
import { ConfirmDirective, AutoFocusDirective } from './directives';
import { ConfirmComponent } from './components';

const SHARED_PIPES: Type<any>[] = [
  StatusPipe,
  AmTimeAgoPipe,
  DurationPipe,
];

const SHARED_DIRECTIVES: Type<any>[] = [
  ConfirmDirective,
  AutoFocusDirective,
];

const SHARED_COMPONENTS: Type<any>[] = [
  ConfirmComponent,
];

@NgModule({
  declarations: [
    ... SHARED_PIPES,
    ... SHARED_DIRECTIVES,
    ... SHARED_COMPONENTS,
  ],
  imports: [
    MaterialModule,
  ],
  exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
    MaterialModule,
    ... SHARED_PIPES,
    ... SHARED_DIRECTIVES,
  ],
})
export class SharedModule { }
