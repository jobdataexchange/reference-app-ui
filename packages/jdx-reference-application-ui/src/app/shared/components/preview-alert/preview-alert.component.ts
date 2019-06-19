import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-alert',
  templateUrl: './preview-alert.component.html'
})
export class PreviewAlertComponent {

  @Input() matches;

}
