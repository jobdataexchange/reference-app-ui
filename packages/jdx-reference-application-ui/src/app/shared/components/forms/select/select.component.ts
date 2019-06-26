import { Component, Input } from '@angular/core';
import { BaseFormField } from '../base-form-field.component';

export interface SelectTypeDefault {name: string; value: string; }

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent extends BaseFormField{

  @Input() defaultOptionText ? = 'Select';

  @Input() options: SelectTypeDefault[];

}


