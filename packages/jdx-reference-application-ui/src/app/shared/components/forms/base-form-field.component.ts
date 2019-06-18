import { Input } from '@angular/core';

export abstract class BaseFormField {
  @Input() control;
  @Input() helpBlock?;
  @Input() id?;
  @Input() label;
  @Input() placeholder?;
  @Input() required? = false;
}
