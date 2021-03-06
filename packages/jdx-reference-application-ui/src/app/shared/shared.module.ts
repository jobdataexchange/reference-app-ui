import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWrapperComponent } from './components/forms/form-wrapper/form-wrapper.component';
import { PreviewAlertComponent } from './components/preview-alert/preview-alert.component';
import { InputTextComponent } from './components/forms/input-text/input-text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from './components/forms/textarea/textarea.component';
import { SelectComponent } from './components/forms/select/select.component';
import { ModalComponent } from './components/modal/modal.component';
import { DateComponent } from './components/forms/date/date.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    FormWrapperComponent,
    PreviewAlertComponent,
    InputTextComponent,
    TextareaComponent,
    SelectComponent,
    ModalComponent,
    DateComponent,
    LoadingComponent
  ],
  exports: [
    FormWrapperComponent,
    PreviewAlertComponent,
    InputTextComponent,
    TextareaComponent,
    SelectComponent,
    ModalComponent,
    DateComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }
