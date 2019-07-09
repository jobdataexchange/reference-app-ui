import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { FormFieldsBasicInfo } from '../base-form.component';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';

@Component({
  selector: 'app-confirm-description',
  templateUrl: './confirm-description.component.html',
  styleUrls: ['./confirm-description.component.css']
})
export class ConfirmDescriptionComponent implements OnInit, OnDestroy {

  constructor(
    private _jobService: JobService,
    private _router: Router
  ) { }

  jobTitle: string;

  private _jobSub: Subscription = null;

  ngOnInit() {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._jobSub.unsubscribe();
  }

  initSubscriptions() {
    this._jobSub = this._jobService.job$
      .subscribe( j => this.jobTitle = j.basicInfo[FormFieldsBasicInfo.TITLE]);
  }

  viewJob() {
    this.navigateTo(JobRoutes.VIEW_JOB);
  }

  createPosting() {
    this.navigateTo(JobRoutes.POSTING_INFO);
  }

  navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

}
