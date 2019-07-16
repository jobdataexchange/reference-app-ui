import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { FormFieldsBasicInfo } from '../base-form.component';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultService } from '@jdx/jdx-reference-application-api-client';

@Component({
  selector: 'app-confirm-description',
  templateUrl: './confirm-description.component.html',
  styleUrls: ['./confirm-description.component.css']
})
export class ConfirmDescriptionComponent implements OnInit, OnDestroy {

  constructor(
    private _api: DefaultService,
    private _fb: FormBuilder,
    private _jobService: JobService,
    private _router: Router
  ) { }

  jobTitle: string;
  form: FormGroup;

  private _jobSub: Subscription = null;
  private _scoreSub: Subscription = null;

  ngOnInit() {
    this.initSubscriptions();
    this.initForm();
  }

  ngOnDestroy(): void {
    this._jobSub.unsubscribe();
  }

  initSubscriptions() {
    this._jobSub = this._jobService.job$
      .subscribe( j => this.jobTitle = j.basicInfo[FormFieldsBasicInfo.TITLE]);
  }

  initForm() {
    this.form =
      this._fb.group(
        {
          validation: [false, Validators.requiredTrue],
        }
      );
  }

  viewJob() {
    this.navigateTo(JobRoutes.VIEW_JOB);
  }

  next() {
    this.navigateTo(JobRoutes.POSTING_INFO);
  }

  navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

}
