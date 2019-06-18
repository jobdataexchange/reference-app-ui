import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWrapperComponent } from './components/forms/form-wrapper/form-wrapper.component';
import { PreviewAlertComponent } from './components/preview-alert/preview-alert.component';
import { InputTextComponent } from './components/forms/input-text/input-text.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormWrapperComponent,
    PreviewAlertComponent,
    InputTextComponent
  ],
  exports: [
    FormWrapperComponent,
    PreviewAlertComponent,
    InputTextComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }
