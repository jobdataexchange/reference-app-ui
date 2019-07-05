import { Component, OnDestroy, OnInit } from '@angular/core';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';
import { Router } from '@angular/router';
import { JobContext, JobService } from '../../shared/services/job.service';
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

  jsonLd;

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
      .subscribe( j => {
        this.jobTitle = j.basicInfo[this.f.TITLE];
        this.reportJsonLd(j);
      });
  }

  viewPosting() {
    this.navigateTo(JobRoutes.POSTING_INFO);
  }

  private reportJsonLd(job: JobContext) {
    const {
      annotatedPreview,
      pipelineID,
      version,
      ...cleanedJob
    } = job;

    // Nested object, each form field 'nested' in view name e.g { "basicInfo": { "industry": "Tech"} }
    // this.jsonLd = cleanedJob;

    // flattened to field name and value e.g { "industry": "Tech" }

    let j = {};

    Object.keys(cleanedJob).forEach( k => {
      j = {...j, ...job[k]};
    });

    this.jsonLd = j;
  }

  private navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

}
