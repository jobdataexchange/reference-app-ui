import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobContext, JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormFieldsBasicInfo } from '../base-form.component';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';
import { LocalStorageService, LocalStorageTypes } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit, OnDestroy {

  constructor(
    private _localStorage: LocalStorageService,
    private _jobService: JobService,
    private _router: Router
  ) { }

  jobTitle: string;

  jsonLd;

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
        this.jobTitle = j.basicInfo[FormFieldsBasicInfo.TITLE];
        this.reportJsonLd(j);
      });
  }

  createNewJob() {
    this.navigateTo(JobRoutes.DESCRIPTION);
  }

  // private reportOrgInfo(org: LocalStorageTypes.OGR) {
  //
  //   const {
  //     annotatedPreview,
  //     pipelineID,
  //     version,
  //     ...cleanedJob
  //   } = org;
  // }

  private reportJsonLd(job: JobContext) {
    const {
      annotatedPreview,
      pipelineID,
      version,
      ...cleanedJob
    } = job;

    // Nested object, each form field 'nested' in view name e.g { "basicInfo": { "industry": "Tech"} }
    // this.jsonLd = {
    //   org: {...this._localStorage.get(LocalStorageTypes.OGR)},
    //   ...cleanedJob
    // };

    // flattened to field name and value e.g { "industry": "Tech" }
    let j = {};

    Object.keys(cleanedJob).forEach( k => {
      j = {
        ...j,
        ...job[k]
      };
    });

    this.jsonLd = {
      ...this._localStorage.get(LocalStorageTypes.OGR),
      ...j
    };
  }

  private navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

}
