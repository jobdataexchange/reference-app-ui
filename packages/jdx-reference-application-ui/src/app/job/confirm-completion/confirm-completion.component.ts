import { Component, OnDestroy, OnInit } from '@angular/core';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';
import { Router } from '@angular/router';
import { JobService } from '../../shared/services/job.service';
import { Subscription } from 'rxjs';
import { FormFieldsBasicInfo } from '../base-form.component';

@Component({
  selector: 'app-confirm-completion',
  templateUrl: './confirm-completion.component.html',
  styleUrls: ['./confirm-completion.component.css']
})
export class ConfirmCompletionComponent implements OnInit, OnDestroy {

  constructor(
    private _jobService: JobService,
    private _router: Router
  ) { }

  jobTitle: string;

  f = FormFieldsBasicInfo;

  private _jobSub: Subscription = null;

  ngOnInit() {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._jobSub.unsubscribe();
  }

  initSubscriptions() {
    this._jobSub = this._jobService.job$
      .subscribe( j => this.jobTitle = j.basicInfo[this.f.TITLE]);
  }

  viewPosting() {
    this.navigateTo(JobRoutes.POSTING_INFO);
  }

  private navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

}
