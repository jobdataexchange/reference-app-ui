import { Component, OnInit } from '@angular/core';
import { JobRoutes } from '../job/job-routing.module';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  jobRoutes = JobRoutes;

  constructor() { }

  ngOnInit() {
  }

}
