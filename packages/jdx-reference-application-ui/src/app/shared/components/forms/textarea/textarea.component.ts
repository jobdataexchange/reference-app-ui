import { Component, Input, OnInit } from '@angular/core';
import { BaseFormField } from '../base-form-field.component';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html'
})
export class TextareaComponent extends BaseFormField {
  @Input() rows? = 1
}
