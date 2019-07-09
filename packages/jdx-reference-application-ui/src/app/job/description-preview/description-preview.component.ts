import { Component } from '@angular/core';
import { JobService } from '../../shared/services/job.service';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description-preview',
  templateUrl: './description-preview.component.html',
  styleUrls: ['./description-preview.component.css']
})
export class DescriptionPreviewComponent {

  constructor(
    private _jobServive: JobService,
    private _router: Router
  ) { }

  get jdxMatchCount() {
    return this._jobServive.jdxMatchCount;
  }

  back() {
    this.navigateTo(JobRoutes.DESCRIPTION);
  }

  next() {
    this.navigateTo(JobRoutes.BASIC_INFO);
  }

  navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }


}
