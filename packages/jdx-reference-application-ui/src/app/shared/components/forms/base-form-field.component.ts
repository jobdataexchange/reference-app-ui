import { Input } from '@angular/core';

export abstract class BaseFormField {
  @Input() control;

  @Input() label;

  @Input() placeholder = '';

  @Input() required = false;

  @Input() helpBlock?;

  @Input() id?;
}
