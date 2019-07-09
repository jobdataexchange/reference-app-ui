import { Component, OnInit } from '@angular/core';
import { Intercom } from 'ng-intercom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'jdx-reference-application';

  constructor(public intercom: Intercom) {}

  ngOnInit(): void {
    this.intercom.boot({});
  }
}
