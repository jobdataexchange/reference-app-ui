import { Component, Input } from '@angular/core';
import { BaseFormField } from '../base-form-field.component';

export type selectTypeDefault = {name:string, value:string};
// export type selectTypeCompetencies = Array<{name:string, value:string}>;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent extends BaseFormField{

  @Input() defaultOptionText? = 'Select';

  @Input() options: selectTypeDefault[];

}


