import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWrapperComponent } from './components/forms/form-wrapper/form-wrapper.component';
import { PreviewAlertComponent } from './components/preview-alert/preview-alert.component';
import { InputTextComponent } from './components/forms/input-text/input-text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from './components/forms/textarea/textarea.component';
import { SelectComponent } from './components/forms/select/select.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    FormWrapperComponent,
    PreviewAlertComponent,
    InputTextComponent,
    TextareaComponent,
    SelectComponent,
    ModalComponent,
  ],
  exports: [
    FormWrapperComponent,
    PreviewAlertComponent,
    InputTextComponent,
    TextareaComponent,
    SelectComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }
