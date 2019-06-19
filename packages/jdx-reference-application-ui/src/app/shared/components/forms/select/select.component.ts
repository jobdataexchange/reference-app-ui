import { Component, Input, OnInit } from '@angular/core';
import { BaseFormField } from '../base-form-field.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent extends BaseFormField implements OnInit {

  @Input() defaultOptionText? = 'Select';

  @Input() options: Array<{name:string, value:string}>;

  ngOnInit(): void {}

}
